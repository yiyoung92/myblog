---
title: Data Cleaning 数据清洗
Link: "[[Machine Learning Lesson]]"
tags:
  - 领域/学习笔记
date: 2024-12-11
key-words:
  - 归一化
  - 数据缩放
  - 缺失值
  - 字符编码
  - 不一致数据录入
  - 解析日期
---

# Data Cleaning 数据清洗
进行数据处理的第一步是认识我们的数据集，搜集数据文档。包括数据的规模，index、column是什么，每个属性列表达什么意思。进而评估有效数据是哪些。
# Handling Missing Values 处理缺失值

## 对缺失的数据进行评价
数据集最普遍的问题之一：数据缺失，通常缺失数据表示为：`NaN` 或 `None`。
==遇到它时需思考两种情况：==
1. 该位置缺失的数据是因为没有被记录吗
2. 该数据是因为对应样本不存在该属性吗
计算数据缺失的数量及比例
```python
# isnull 用于判断是否为null，返回的是与df数据一样维度的布尔值
#sum默认是按列对数据加和，返回的是以列名为index的序列。
missing_values_count = df.isnull().sum()
#用sum对序列求和得到总数
total_missing = missing_values_count.sum()
#shape方法得到df数据集的行列数，product进行乘法得到总数
total_cells = np.product(df.shape)
#其中df.shape[0]是行数值，df.shape[1]是列数值
#计算缺失数据百分比
percent_missing = (total_missing/total_cells) * 100
```

## 丢弃缺失数据
两个丢弃原则：
1. 每一行是一个样本，如果该行有缺失数据，则丢弃该样本
2. 每一列是一个属性，如果该列有缺失数据，则丢弃该属性

```python
#dropna方法默认是按行丢弃
df.dropna()
#通过设置参数axis=1，则为按列丢弃，返回的是处理后的数据
columns_with_na_dropped = nfl_data.dropna(axis=1)
```

## 填充缺失数值
填充的原则：
1. 对于数值型的属性，直接以0或者其他数字（平均值、指定值等）填充
2. 对于数值或字符型属性，直接以该单元格临近单元格的内容来填充
```python
# 对所有NA替换为数值0
df.fillna(0)
# 对所有NA替换为下一“行”单元格的内容， axis=0确定替换方向为行，method='bfill'指定为后向填充，'ffill'指定为前向填充。
#如果连续单元格为na，仍会有部分为na的，则用0填充。
df.fillna(method='bfill', axis=0).fillna(0)
# 计算列'A'的平均值，忽略缺失值
mean_value_A = df['A'].mean()
# 使用fillna方法将平均值填充到列'A'的缺失值位置
df['A'] = df['A'].fillna(mean_value_A)
```

# Scaling 、Normalization、Standardization 缩放、归一化、标准化
为什么要考虑对数据进行缩放与归一化：
1. **统一量纲**：避免某些特征在模型中的权重过大。    
2. **加速收敛**：帮助算法（如梯度下降）更快地找到最优解。    
3. **提高精度**：对于一些算法，如支持向量机（SVM）、K近邻（KNN）和K均值聚类，提高模型的预测精度。    
4. **避免数值问题**：避免过大的数值导致稳定性问题，如梯度爆炸或数值溢出。
5. **满足算法要求**：例如神经网络通常需要输入数据在[0, 1]或[-1, 1]的范围内。

**缩放、归一化、标准化的区别：**
1. 缩放改变的是数据的范围尺度。
2. 标准化改变的是数据的分布。
3. 归一化是把数据调整到[0, 1]或[-1, 1]的范围区间，与以上两者定义互有重合。
[[一文详解特征缩放、标准化、归一化的定义、区别、特点和作用]]中讲解了这几个定义的区别以及应该什么时候使用他们。
### 缩放Scaling
对数据数值等比例的调整。
以常见的[[数据缩放方法]]中的**最小-最大缩放**举例
```python fold
# for min_max scaling
from mlxtend.preprocessing import minmax_scaling
# generate 1000 data points randomly drawn from an exponential distribution
original_data = np.random.exponential(size=1000)

# mix-max scale the data between 0 and 1
scaled_data = minmax_scaling(original_data, columns=[0])

# plot both together to compare
fig, ax = plt.subplots(1, 2, figsize=(15, 3))
sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
ax[0].set_title("Original Data")
sns.histplot(scaled_data, ax=ax[1], kde=True, legend=False)
ax[1].set_title("Scaled data")
plt.show()
```
注意下图横轴坐标变化，图形数据的分布是没有变化的。
![[Pasted image 20241211134430.png]]
### **标准化**Standardization

归一化改变的是对数据观察的维度，**标准化**Standardization可以叫做Z-Score Normalization，使其分布更接近==正态分布==，例如某些机器学习的算法假设了输入数据满足正态分布时，就要及进行归一化处理。

标准化后的数据将具有均值为0和标准差为1的特性，这通常会使数据分布更接近正态分布，尤其是当原始数据本身接近正态分布时。
如果原始数据分布严重偏斜，可能需要使用更复杂的方法（如Box-Cox变换或Yeo-Johnson变换）来转换数据，使其更接近正态分布。这些方法可以更好地处理非正态数据，并且可以在数据包含零或负值时使用。这里以 Box-Cox 变换举例。
```python
# for Box-Cox Transformation
from scipy import stats
# normalize the exponential data with boxcox
normalized_data = stats.boxcox(original_data)
# plot both together to compare
fig, ax=plt.subplots(1, 2, figsize=(15, 3))
sns.histplot(original_data, ax=ax[0], kde=True, legend=False)
ax[0].set_title("Original Data")
sns.histplot(normalized_data[0], ax=ax[1], kde=True, legend=False)
ax[1].set_title("Normalized data")
plt.show()
```
注意下图的图形分布，由原来的L型变成了近似正态。
![[Pasted image 20241211134419.png]]
# Parsing Dates 解析日期
通常在数据集中表示为日期的数据类型显示为dtype: object，包含字符串。如果成功识别，则pandas会把日期类型存储为datetime64。
对于没被正确识别的实际为日期的字符串，需要进行日期解析。
根据日期的格式来解析：
- 1/17/07 has the format "%m/%d/%y"
- 17-1-2007 has the format "%d-%m-%Y"
```python
# create a new column, date_parsed, with the parsed dates
landslides['date_parsed'] = pd.to_datetime(landslides['date'], format="%m/%d/%y")
```

当使用上述指令时，有时会碰到解析错误的情况：
如果是少数样本日期输入问题，可以手动填入日期。再运行指令。
如果是同一列存在多个日期样式。则通过 `infer_datetime_format = True`参数让pandas自主推断格式。速度比指定format慢，且也不一定都能搞定。
```python
landslides['date_parsed'] = pd.to_datetime(landslides['Date'], infer_datetime_format=True)
```

对于已解析后的数据，可以通过命令提取年月日
```python
# get the day of the month from the date_parsed column，返回的数据类型为dtype: float64
day_of_month_landslides = landslides['date_parsed'].dt.day
```

日期解析最常见的错误是混淆日期与月份，可以通过直方图的形式，看看生成的数据在日期分布上是否合理。
```python
# remove na's
day_of_month_landslides = day_of_month_landslides.dropna()
# plot the day of the month
sns.distplot(day_of_month_landslides, kde=False, bins=31)
```

# Character Encodings 字符编码
UTF-8 是标准的文本编码。所有 Python 代码都是 UTF-8 编码，如果碰到其他编码时，可能会显示为乱码，这时就需要字符编码。
python3 中的文本主要有两种类型：1）字符串，2）字节类型。
字节类型是一系列整数，可以通过指定编码与字符串转换。

```python
before = "This is the euro symbol: €"
# encode将before字符串按utf-8进行编码
after = before.encode("utf-8", errors="replace")
#decode将after字符串按ytf-8进行解码还原
print(after.decode("utf-8"))
```

对于第一次读取且不是utf-8默认编码的文字，可以使用`charset_normalizer`方法进行编码检测：

```python
# look at the first ten thousand bytes to guess the character encoding
with open("../input/kickstarter-projects/ks-projects-201801.csv", 'rb') as rawdata:
    result = charset_normalizer.detect(rawdata.read(10000))

# check what the character encoding might be
print(result)
```

# Inconsistent Data Entry 不一致数据录入

常见的数据录入异常包括：多余的空格、大小写不一致。
```python
# convert to lower case
professors['Country'] = professors['Country'].str.lower()
# remove trailing white spaces
professors['Country'] = professors['Country'].str.strip()
```
## 模糊匹配 fuzzy matching
自动查找并匹配与目标相似的字符串，返回的是包含近似字符串和匹配度的序列。
需传递参数为：目标字符串，待匹配的字符串，最低匹配率，返回的limit数量。
```python fold
# helpful modules
import fuzzywuzzy
from fuzzywuzzy import process
import charset_normalizer

def replace_matches_in_column(df, column, string_to_match, min_ratio = 47):
    # get a list of unique strings
    strings = df[column].unique()
    
    # get the top 10 closest matches to our input string
    matches = fuzzywuzzy.process.extract(string_to_match, strings, limit=10,scorer=fuzzywuzzy.fuzz.token_sort_ratio)

    # only get matches with a ratio > 90
    close_matches = [matches[0] for matches in matches if matches[1] >= min_ratio]

    # get the rows of all the close matches in our dataframe
    rows_with_matches = df[column].isin(close_matches)

    # replace all rows with close matches with the input matches 
    df.loc[rows_with_matches, column] = string_to_match
    
    # let us know the function's done
    print("All done!")

replace_matches_in_column(df=professors, column='Country', string_to_match="south korea")
```