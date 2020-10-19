from django.shortcuts import render
# Create your views here.
from dwebsocket.decorators import accept_websocket, require_websocket
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from DjangoRestAuth.publicApi import DocParam, get_parameter_dic,tid_maker, RedisHelper
from train_net.tasks import start_running
import time,json
from django.conf import settings
from django.core.cache import cache
@accept_websocket
def echo_once(request,executionId):
    if not request.is_websocket():  # 判断是不是websocket连接
        try:  # 如果是普通的http方法
            message = request.GET['message']
            return HttpResponse(message)
        except:
            return render(request, 'index.html')
    else:
        while True:
        # for message in request.websocket:
            # message = message.decode('utf-8')  # 接收前端发来的数据
            # print(message)
            # print('收到websocket请求')
            print('executionId=======',executionId)
            obj = RedisHelper(executionId)
            redis_sub = obj.subscribe()
            msg = redis_sub.parse_response()
            if type(msg[2]) == bytes:
                msg = msg[2].decode()
                print(msg+'--==')
                msg = json.loads(msg.replace("'", '"'))
                msg = json.dumps(msg, ensure_ascii=False).encode('utf-8')
                message = msg
                print(message)
                request.websocket.send(message)

import threading
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
        task_id = tid_maker()
        run = threading.Thread(target=start_running, args=(task_id,lr,epoch_range))
        run.start()
        # start_running.delay(lr,epoch_range)
        return Response({"executionId": task_id})