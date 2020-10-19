#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/4/7 14:39
# @Author  : tiancai.wu
from time import sleep
def test():
    for i in range(10):
        print('>>' * (i + 1))
        sleep(1)

if __name__ == '__main__':
    test()