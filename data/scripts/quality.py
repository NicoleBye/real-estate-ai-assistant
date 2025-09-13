import pandas as pd

df = pd.read_csv()

print("=" * 50)
print("数据基本信息")
print("=" * 50)
print(f"数据形状: {df.shape[0]} 行 x {df.shape[1]} 列")
print(f"数据类型:\n{df.dtypes}")

print("\n" + "=" * 50)
print("缺失值检查")
print("=" * 50)
missing_info = df.isnull().sum()
missing_percent = (df.isnull().sum() / len(df)) * 100

missing_df = pd.DataFrame({
    '缺失值数量': missing_info,
    '缺失值百分比': missing_percent.round(2)
})
print(missing_df[missing_df['缺失值数量'] > 0])  # 只显示有缺失值的列

print("\n" + "=" * 50)
print("数值型字段统计")
print("=" * 50)
# 获取数值型列
numeric_cols = df.select_dtypes(include=['number']).columns

if len(numeric_cols) > 0:
    stats_df = pd.DataFrame({
        '最小值': df[numeric_cols].min(),
        '最大值': df[numeric_cols].max(),
        '平均值': df[numeric_cols].mean().round(2),
        '中位数': df[numeric_cols].median(),
        '标准差': df[numeric_cols].std().round(2)
    })
    print(stats_df)
else:
    print("没有数值型列")

print("\n" + "=" * 50)
print("完整描述性统计")
print("=" * 50)
print(df.describe())

print("\n" + "=" * 50)
print("非数值型字段统计")
print("=" * 50)
categorical_cols = df.select_dtypes(include=['object', 'category']).columns

if len(categorical_cols) > 0:
    for col in categorical_cols:
        print(f"\n{col}:")
        print(f"  唯一值数量: {df[col].nunique()}")
        print(f"  最频繁值: {df[col].mode().iloc[0] if not df[col].mode().empty else 'N/A'}")
        print(f"  出现次数: {df[col].value_counts().iloc[0] if len(df[col].value_counts()) > 0 else 0}")
else:
    print("没有找到非数值型列")

print("\n" + "=" * 50)
print("数据预览")
print("=" * 50)
print("前5行:")
print(df.head())
print("\n后5行:")
print(df.tail())