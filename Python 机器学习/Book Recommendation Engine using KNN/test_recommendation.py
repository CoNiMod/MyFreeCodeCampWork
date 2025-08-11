# -*- coding: utf-8 -*-
"""
测试图书推荐引擎的脚本
这个脚本用于验证推荐算法的逻辑，不依赖外部数据下载
"""

import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

def create_sample_data():
    """创建示例数据用于测试"""
    # 创建示例图书数据
    sample_books = pd.DataFrame({
        'isbn': ['B001', 'B002', 'B003', 'B004', 'B005', 'B006'],
        'title': [
            'Where the Heart Is (Oprah\'s Book Club (Paperback))',
            'I\'ll Be Seeing You',
            'The Weight of Water',
            'The Surgeon',
            'I Know This Much Is True',
            'Another Book'
        ],
        'author': ['Author1', 'Author2', 'Author3', 'Author4', 'Author5', 'Author6']
    })
    
    # 创建示例评分数据
    sample_ratings = pd.DataFrame({
        'user': [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5] * 2,
        'isbn': ['B001', 'B002', 'B003', 'B001', 'B002', 'B003', 'B001', 'B002', 'B003', 'B001', 'B002', 'B003', 'B001', 'B002', 'B003'] * 2,
        'rating': [8.0, 7.5, 7.0, 8.5, 7.0, 7.5, 8.0, 7.5, 7.0, 8.5, 7.0, 7.5, 8.0, 7.5, 7.0] * 2
    })
    
    return sample_books, sample_ratings

def test_recommendation_engine():
    """测试推荐引擎的核心逻辑"""
    print("开始测试图书推荐引擎...")
    
    # 创建示例数据
    df_books, df_ratings = create_sample_data()
    
    print(f"示例图书数量: {len(df_books)}")
    print(f"示例评分数量: {len(df_ratings)}")
    
    # 模拟数据预处理
    # 统计每个用户的评分数量
    user_rating_counts = df_ratings['user'].value_counts()
    # 统计每本书的评分数量
    book_rating_counts = df_ratings['isbn'].value_counts()
    
    # 过滤用户和图书（这里设置较低的阈值用于测试）
    filtered_users = user_rating_counts[user_rating_counts >= 2].index
    filtered_books = book_rating_counts[book_rating_counts >= 2].index
    
    print(f"过滤后的用户数量: {len(filtered_users)}")
    print(f"过滤后的图书数量: {len(filtered_books)}")
    
    # 应用过滤
    df_ratings_filtered = df_ratings[
        (df_ratings['user'].isin(filtered_users)) & 
        (df_ratings['isbn'].isin(filtered_books))
    ]
    
    # 创建用户-图书评分矩阵
    user_id_map = {user_id: idx for idx, user_id in enumerate(filtered_users)}
    book_id_map = {book_isbn: idx for idx, book_isbn in enumerate(filtered_books)}
    
    # 创建稀疏矩阵
    rows = [user_id_map[user_id] for user_id in df_ratings_filtered['user']]
    cols = [book_id_map[book_isbn] for book_isbn in df_ratings_filtered['isbn']]
    data = df_ratings_filtered['rating'].values
    
    rating_matrix = csr_matrix((data, (rows, cols)), 
                              shape=(len(filtered_users), len(filtered_books)))
    
    print(f"评分矩阵形状: {rating_matrix.shape}")
    
    # 训练KNN模型
    # 转置矩阵，使得每本书成为一个特征向量（每行代表一本书，每列代表一个用户）
    rating_matrix_transposed = rating_matrix.T
    knn_model = NearestNeighbors(metric='cosine', algorithm='brute')
    knn_model.fit(rating_matrix_transposed)
    
    # 创建反向映射
    book_id_reverse_map = {idx: book_isbn for book_isbn, idx in book_id_map.items()}
    
    # 实现推荐函数
    def get_recommends(book=""):
        # 查找图书在数据集中的索引
        book_row = df_books[df_books['title'] == book]
        
        if book_row.empty:
            return [book, []]
        
        book_isbn = book_row.iloc[0]['isbn']
        
        # 检查图书是否在过滤后的数据集中
        if book_isbn not in book_id_map:
            return [book, []]
        
        book_idx = book_id_map[book_isbn]
        
        # 获取该图书的评分向量
        book_ratings = rating_matrix[:, book_idx].toarray().flatten()
        
        # 使用KNN找到最相似的图书
        book_ratings_reshaped = book_ratings.reshape(1, -1)
        
        # 找到最近的邻居（排除自己）
        n_neighbors = min(6, len(filtered_books))  # 确保不超过可用的图书数量
        distances, indices = knn_model.kneighbors(book_ratings_reshaped, n_neighbors=n_neighbors)
        
        # 构建推荐列表
        recommended_books = []
        for i in range(1, min(6, len(indices[0]))):  # 跳过第一个（自己），最多5个推荐
            neighbor_idx = indices[0][i]
            distance = distances[0][i]
            
            # 从索引获取图书ISBN
            neighbor_isbn = book_id_reverse_map[neighbor_idx]
            
            # 从索引获取图书标题
            neighbor_title = df_books[df_books['isbn'] == neighbor_isbn]['title'].iloc[0]
            
            recommended_books.append([neighbor_title, distance])
        
        return [book, recommended_books]
    
    # 测试推荐功能
    test_book = "Where the Heart Is (Oprah's Book Club (Paperback))"
    recommendations = get_recommends(test_book)
    
    print(f"\n测试图书: {test_book}")
    print(f"推荐结果: {recommendations}")
    
    # 验证推荐格式
    if len(recommendations) == 2:
        if recommendations[0] == test_book:
            print("✓ 推荐格式正确")
        else:
            print("✗ 推荐格式错误")
        
        if len(recommendations[1]) > 0:
            print("✓ 成功生成推荐")
        else:
            print("✗ 没有生成推荐")
    else:
        print("✗ 推荐格式不正确")
    
    print("\n测试完成！")

if __name__ == "__main__":
    test_recommendation_engine()
