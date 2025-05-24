---
title: Computer Vision 机器视觉
Link: "[[Machine Learning Lesson]]"
tags:
  - 领域/学习笔记
date: 2025-01-08
key-words:
---
# Computer Vision 机器视觉

在机器学习中处理图像任务最佳的是卷积神经网络（CNN），其基础是解决图像分类问题，构建图像分类器。
# The Convolutional Classifier 卷积分类器
用于图像分类的卷积神经网络由两部分组成：卷积基和密集头部。（a **convolutional base** and a **dense head**.）
![[Pasted image 20250109135010.png]]
卷积基用于从图像中提取视觉特征。它主要由执行卷积操作的层组成，但通常还包括其他类型的层。
密集头用于确定图像的类别。它主要由密集层组成，但可能包括其他层，如 dropout。
网络在训练中的目标是学习两件事：
1. which features to extract from an image (base),  
    从图像（基础）中提取哪些特征
2. which class goes with what features (head).  
    哪个类别对应哪些特征（头部）。
通常我们重用一些成熟的预训练模型的底层base。然后，我们将未训练的头部head附加到预训练的底层base。

## 读取图像数据
```python file:initData.py fold

# Imports
import os, warnings
import matplotlib.pyplot as plt
from matplotlib import gridspec

import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory

# Reproducability
def set_seed(seed=31415):
    np.random.seed(seed)
    tf.random.set_seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    os.environ['TF_DETERMINISTIC_OPS'] = '1'
set_seed(31415)
# Set Matplotlib defaults
plt.rc('figure', autolayout=True)
plt.rc('axes', labelweight='bold', labelsize='large',
       titleweight='bold', titlesize=18, titlepad=10)
plt.rc('image', cmap='magma')
warnings.filterwarnings("ignore") # to clean up output cells

# Load training and validation sets
ds_train_ = image_dataset_from_directory(
    '../input/car-or-truck/train',
    labels='inferred',
    label_mode='binary',
    image_size=[128, 128],
    interpolation='nearest',
    batch_size=64,
    shuffle=True,
)
ds_valid_ = image_dataset_from_directory(
    '../input/car-or-truck/valid',
    labels='inferred',
    label_mode='binary',
    image_size=[128, 128],
    interpolation='nearest',
    batch_size=64,
    shuffle=False,
)

# Data Pipeline
def convert_to_float(image, label):
    image = tf.image.convert_image_dtype(image, dtype=tf.float32)
    return image, label
    
AUTOTUNE = tf.data.experimental.AUTOTUNE
ds_train = (
    ds_train_
    .map(convert_to_float)
    .cache()
    .prefetch(buffer_size=AUTOTUNE)
)
ds_valid = (
    ds_valid_
    .map(convert_to_float)
    .cache()
    .prefetch(buffer_size=AUTOTUNE)
)
```
