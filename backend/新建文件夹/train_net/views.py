from django.shortcuts import render

# Create your views here.
from dwebsocket.decorators import accept_websocket, require_websocket
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from DjangoRestAuth.publicApi import DocParam, get_parameter_dic
from train_net.tasks import start_running
import time
from django.conf import settings
@accept_websocket
def echo_once(request):
    if not request.is_websocket():  # 判断是不是websocket连接
        try:  # 如果是普通的http方法
            message = request.GET['message']
            return HttpResponse(message)
        except:
            return render(request, 'index.html')
    else:
        for message in request.websocket:
            message = message.decode('utf-8')  # 接收前端发来的数据
            print(message)
            print('收到websocket请求')
            with open(settings.LOG_FILE, 'r', encoding='UTF-8') as f:
                log_length = len(f.readlines())
                time.sleep(1)
            while True:
                with open(settings.LOG_FILE, 'r', encoding='UTF-8') as f:
                    contents = f.readlines()
                    length_tmp = len(contents)
                for i in range(log_length, length_tmp):
                    request.websocket.send(contents[i].encode('utf-8'))
                log_length = length_tmp
                time.sleep(1)
            # if message == 'test':  # 这里根据web页面获取的值进行对应的操作
            #     command = 'bash /opt/test.sh'  # 这里是要执行的命令或者脚本
            #     while True:
            #         # nextline = stdout.readline().strip()  # 读取脚本输出内容
            #         # print(nextline.strip())
            #         # request.websocket.send(nextline)  # 发送消息到客户端
            #         # 判断消息为空时,退出循环
            #         # if not nextline:
            #         #     break
            #         pass
            #
            # else:
            #     request.websocket.send('小样儿，没权限!!!'.encode('utf-8'))

# logging.basicConfig(level=logging.DEBUG,#控制台打印的日志级别
#                     filename=settings.LOG_FILE,
#                     filemode='a',##模式，有w和a，w就是写模式，每次都会重新写日志，覆盖之前的日志
#                     #a是追加模式，默认如果不写的话，就是追加模式
#                     format=
#                     '%(asctime)s - %(pathname)s[line:%(lineno)d] - %(levelname)s: %(message)s'
#                     #日志格式
#                     )

# # 第一步，创建一个logger
# logger = logging.getLogger()
# logger.setLevel(logging.DEBUG)  # Log等级总开关

# # 第二步，创建一个handler，用于写入日志文件
# logfile = settings.LOG_FILE
# fh = logging.FileHandler(logfile, mode='a')
# fh.setLevel(logging.DEBUG)  # 输出到file的log等级的开关
#
# # 第三步，再创建一个handler，用于输出到控制台
# ch = logging.StreamHandler()
# ch.setLevel(logging.DEBUG)  # 输出到console的log等级的开关
#
# # 第四步，定义handler的输出格式
# formatter = logging.Formatter('%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')
# fh.setFormatter(formatter)
# ch.setFormatter(formatter)
#
# # 第五步，将logger添加到handler里面
# logger.addHandler(fh)
# logger.addHandler(ch)
from DjangoRestAuth.config.logger import log
class run_neural_net(APIView):

    '''
    训练神经网络
    '''
    coreapi_fields = (
        DocParam("epoch_range", description='轮询次数', required=True),#10
        DocParam("lr", description='浮点'),#0.01

    )
    def post(self, request, *args, **kwargs):
        epoch_range = get_parameter_dic(request)['epoch_range']
        lr = get_parameter_dic(request)['lr']
        log.info('55fdgavdgfdg')
        start_running.delay(lr,epoch_range)
        return Response({"epoch_range": epoch_range, 'lr': lr})