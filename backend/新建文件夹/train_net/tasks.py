#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/4/2 16:06
# @Author  : tiancai.wu
# from train_net.run_neural_network import train_net
from DjangoRestAuth.celery import app
from time import sleep
from  DjangoRestAuth.config.celeryconfig import CeleryConfig
app.config_from_object(CeleryConfig)
from celery.utils.log import get_task_logger
log = get_task_logger(__name__)
# from DjangoRestAuth.config.logger import log
from django.core.cache import cache

@app.task(bind=True)
def start_running(lr,epoch_range):
  cache.set('key_log', 'value', 10*60)
  print('***>%s<***' %lr,)
  print('--->>开始执行任务<<---')
  for i in range(int(epoch_range)):
    print('>>'*(i+1))
    cache.set('key_log', '>>'*(i+1), 10*60)
    sleep(1)
  print('>---任务结束---<')
  cache.set('key_log', '>---任务结束---<', 10 * 60)