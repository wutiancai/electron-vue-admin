import coreapi
from rest_framework.request import Request
from django.http import QueryDict
from DjangoRestAuth.settings import REDIS_HOST,REDIS_PORT
import redis
import datetime
# swagger ui参数设置
def DocParam(name="default", location="query",
             required=True, description=None, type="string",
             *args, **kwargs):
    return coreapi.Field(name=name, location=location,
                         required=required, description=description,
                         type=type)

# 获取request参数统一
def get_parameter_dic(request, *args, **kwargs):
    if isinstance(request, Request) == False:
        return {}

    query_params = request.query_params
    if isinstance(query_params, QueryDict):
        query_params = query_params.dict()
    result_data = request.data
    if isinstance(result_data, QueryDict):
        result_data = result_data.dict()

    if query_params != {}:
        return query_params
    else:
        return result_data

class RedisHelper():
    def __init__(self, key):
        self.__conn = redis.Redis(host=REDIS_HOST, port=REDIS_PORT)
        self.chan_sub = key
        self.chan_pub= key

    #发送消息
    def public(self,msg):
        # logger.info(msg)
        self.__conn.publish(self.chan_pub,msg)
        return True
    #订阅
    def subscribe(self):
        #打开收音机
        pub = self.__conn.pubsub()
        #调频道
        pub.subscribe(self.chan_sub)
        #准备接收
        pub.parse_response()
        return pub

def tid_maker():
    return '{0:%Y%m%d%H%M%S%f}'.format(datetime.datetime.now())
