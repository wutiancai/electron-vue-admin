#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/4/2 16:06
# @Author  : tiancai.wu
from DjangoRestAuth.celery import app
from time import sleep
from  DjangoRestAuth.config.celeryconfig import CeleryConfig
from DjangoRestAuth.publicApi import RedisHelper
from subprocess  import Popen,PIPE
import os
app.config_from_object(CeleryConfig)
from celery.utils.log import get_task_logger
log = get_task_logger(__name__)
from django.conf import settings
from django.core.cache import cache
# redis连接
# import redis
# re_data = redis.Redis(host='localhost', port=6379)
# re_data.publish('admin', 'python111')
# @app.task()#celery -A DjangoRestAuth worker --loglevel=DEBUG
def start_running(task_id,lr,epoch_range):

  # key value存储到redis数据库
  # cache.set('key_log', 'value', 10*60)
  # obj = RedisHelper("admin")
  print('***>%s<***' %lr,)
  print('--->>开始执行任务<<---')
  runScript(task_id)
  # for i in range(int(epoch_range)):
  #   print('>>'*(i+1))
  #   # cache.set('key_log', '>>'*(i+1), 10*60)
  #   msg = {'message':str('>>'*(i+1))}
  #   obj.public(str(msg))
  #   sleep(1)
  # print('>---任务结束---<')


def runPopen(job):
  """
  执行命令,返回popen
  """
  # path = os.path
  # Path = path.abspath(path.join(BASE_DIR, path.pardir))
  # script_path = path.abspath(path.join(Path, 'run.sh'))
  # cmd = "sh %s %s" % (script_path, job)
  path = settings.BASE_DIR
  path = os.path.abspath(path+"/train_net")
  file = "\\run_test.py"
  scriptpath = (path+file).strip()
  cmd = "python \"%s\" %s" % (scriptpath, job)
  print('cmd',cmd)
  return Popen(cmd, shell=False, stdout=PIPE, stderr=PIPE)

def runScript(task_id):
  obj = RedisHelper(task_id)
  popen = runPopen("")
  print("start-------")
  while True:
    output = popen.stdout.readline()
    if output == '' and popen.poll() is not None:
      break

    if output:

      output_text = str(output.strip(),encoding = "utf8")
      msg = {'message': output_text,"executionId":task_id}
      obj.public(str(msg))
      print(str(msg))
      # async_to_sync(
      #   channel_layer.group_send
      # )(
      #   group_name,
      #   {"type": "job.message", "text": output_text}
      # )
    else:
      err = popen.stderr.readline()
      err_text = str(err.strip(),encoding = "utf8")
      print('err',err_text)
      msg = {'message': err_text}
      obj.public(str(msg))
      # async_to_sync(
      #   channel_layer.group_send
      # )(
      #   group_name,
      #   {"type": "job.message", "text": err_text}
      # )
      break
