# coding: utf-8
from functools import reduce
import torch
import torchvision
import torchvision.transforms as transforms
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import sys


class MyNet(nn.Module):

    # 可以先定义网络里面的组件
    def __init__(self):
        super(MyNet, self).__init__()
        self.conv1 = nn.Conv2d(3, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16 * 5 * 5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    # 然后再使用定义的组件,把网络的结构搭建起来
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 16 * 5 * 5)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

    def num_flat_features(self, x):
        size = x.size()[1:]
        return reduce(lambda x1, x2: x1 * x2, size)


def train_net(epoch_range=10,lr=0.01):
    device = torch.device('cuda:0')

    myNet = MyNet()
    myNet.to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(myNet.parameters(), lr=lr, momentum=0.9)#lr=0.01

    # 获取 cifar10 数据库
    transform = transforms.Compose(
        [transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
    )

    trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=False, transform=transform)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=32, shuffle=True, num_workers=4)

    for epoch in range(epoch_range):#range(10)

        running_loss = 0.0
        for i, data in enumerate(trainloader, 0):
            inputs, labels = [item.to(device) for item in data]

            optimizer.zero_grad()

            outputs = myNet(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            if i % 50 == 49:
                print('[%d, %5d] loss: %.5f' %
                      (epoch + 1, i + 1, running_loss / 2000))
                running_loss = 0.0
    print('Finish training')
    PATH = './cifar_net.pth'
    torch.save(myNet.state_dict(), PATH)


# def test_net():
#     transform = transforms.Compose(
#         [transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))]
#     )
#     testset = torchvision.datasets.CIFAR10(root='./data', train=False, download=False, transform=transform)
#     testloader = torch.utils.data.DataLoader(testset, batch_size=4, shuffle=False, num_workers=1)
#
#     classes = ('plane', 'car', 'bird', 'cat',
#                'deer', 'dog', 'frog', 'horse', 'ship', 'truck')
#
#     dataiter = iter(testloader)
#     images, labels = dataiter.next()
#
#     myNet = MyNet()
#     myNet.load_state_dict(torch.load('./cifar_net.pth'))
#
#     outputs = myNet(images)
#
#     _, predicted = torch.max(outputs, 1)
#     print('Predicted: ', ''.join('%5s' % classes[predicted[j]] for j in range(4)))
#
#     correct = 0
#     total = 0
#     with torch.no_grad():
#         for data in testloader:
#             images, labels = data
#             outputs = myNet(images)
#             _, predicted = torch.max(outputs.data, 1)
#             total += labels.size(0)
#             correct += (predicted == labels).sum().item()
#
#     print('Accuracy of the network on the 10000 test images: %d %%' % (
#             100 * correct / total))
#

if __name__ == '__main__':
    # epoch_range = sys.argv[1]
    # lr = sys.argv[2]
    epoch_range = 10
    lr = 0.01
    print(epoch_range,lr)
    train_net(epoch_range,lr)
    # test_net()
