#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/4/3 12:09
# @Author  : tiancai.wu

# import logging
#
# from celery._state import get_current_task
#
# class Formatter(logging.Formatter):
#     """Formatter for tasks, adding the task name and id."""
#
#     def format(self, record):
#         task = get_current_task()
#         if task and task.request:
#             record.__dict__.update(task_id='666666666666666',#'%s ' % task.request.id,
#                                    task_name='%s ' % task.name)
#         else:
#             record.__dict__.setdefault('task_name', '777777')
#             record.__dict__.setdefault('task_id', '')
#         return logging.Formatter.format(self, record)
#
#
# root_logger = logging.getLogger() # 返回logging.root
# root_logger.setLevel(logging.DEBUG)
#
# # 将日志输出到文件
# fh = logging.FileHandler('celery_worker.log') # 这里注意不要使用TimedRotatingFileHandler，celery的每个进程都会切分，导致日志丢失
# formatter = Formatter('[%(task_name)s%(task_id)s%(process)s %(thread)s %(asctime)s %(pathname)s:%(lineno)s] %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
# fh.setFormatter(formatter)
# fh.setLevel(logging.DEBUG)
# root_logger.addHandler(fh)
#
# # 将日志输出到控制台
# sh = logging.StreamHandler()
# formatter = Formatter('[%(task_name)s%(task_id)s%(process)s %(thread)s %(asctime)s %(pathname)s:%(lineno)s] %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
# sh.setFormatter(formatter)
# sh.setLevel(logging.INFO)
# root_logger.addHandler(sh)

class CeleryConfig(object):
    BROKER_URL = 'redis://localhost:6379/2'
    # CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
    CELERY_TASK_SERIALIZER = 'pickle' # " json从4.0版本开始默认json,早期默认为pickle（可以传二进制对象）
    CELERY_RESULT_SERIALIZER = 'pickle'
    CELERY_ACCEPT_CONTENT = ['json', 'pickle']
    CELERY_ENABLE_UTC = True # 启用UTC时区
    CELERY_TIMEZONE = 'Asia/Shanghai' # 上海时区
    CELERYD_HIJACK_ROOT_LOGGER = True # 拦截根日志配置
    CELERYD_MAX_TASKS_PER_CHILD = 1 # 每个进程最多执行1个任务后释放进程（再有任务，新建进程执行，解决内存泄漏）
