import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import requests
import os

class DataChartExplorer:
    def __init__(self):
        self.df = None
        self.column_names = []
        self.current_columns = []

    def load_csv_from_upload(self):
        """从本地上传CSV文件"""
        print("\n 本地文件上传")
        print("请将CSV文件拖拽到终端中，或输入完整路径:")
        
        try:
            file_path = input("文件路径: ").strip().strip('"').strip("'")
            
            if not os.path.exists(file_path):
                print("❌ 文件不存在，请检查路径")
                return False
                
            if not file_path.lower().endswith('.csv'):
                print("❌ 请选择CSV文件")
                return False
                
            self.df = pd.read_csv(file_path)
            print(f"✅ 成功加载文件: {os.path.basename(file_path)}")
            return True
            
        except Exception as e:
            print(f"❌ 加载文件失败: {e}")
            return False

    def load_csv_from_url_input(self):
        """从用户输入的URL获取CSV文件"""
        print("\n 从URL获取CSV文件")
        print("请输入包含CSV文件的URL:")
        
        try:
            url = input("URL: ").strip()
            
            if not url.startswith(('http://', 'https://')):
                url = 'https://' + url
                
            print("正在下载数据...")
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            # 保存到临时文件
            temp_file = 'temp_data.csv'
            with open(temp_file, 'wb') as f:
                f.write(response.content)
                
            self.df = pd.read_csv(temp_file)
            
            # 清理临时文件
            if os.path.exists(temp_file):
                os.remove(temp_file)
                
            print("✅ 成功从URL加载数据")
            return True
            
        except Exception as e:
            print(f"❌ 从URL加载失败: {e}")
            return False

    def load_csv_from_code_url(self):
        """从代码中预设的URL获取CSV文件"""
        print("\n 从预设URL获取CSV文件")
        
        # 预设一些公开的CSV数据源
        sample_urls = {
            '1': 'https://raw.githubusercontent.com/datasets/iris/master/data/iris.csv',
            '2': 'https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv',
            '3': 'https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv'
        }
        
        print("可用的数据源:")
        for key, url in sample_urls.items():
            print(f"  {key}. {url.split('/')[-1]}")
        
        try:
            choice = input("\n请选择数据源 (1-3): ").strip()
            
            if choice not in sample_urls:
                print("❌ 无效选择")
                return False
                
            url = sample_urls[choice]
            print(f"正在下载: {url}")
            
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            # 保存到临时文件
            temp_file = 'temp_data.csv'
            with open(temp_file, 'wb') as f:
                f.write(response.content)
                
            self.df = pd.read_csv(temp_file)
            
            # 清理临时文件
            if os.path.exists(temp_file):
                os.remove(temp_file)
                
            print("✅ 成功加载预设数据")
            return True
            
        except Exception as e:
            print(f"❌ 加载预设数据失败: {e}")
            return False

    def process_dataframe(self):
        """处理数据帧，提取基本信息"""
        if self.df is None:
            print("❌ 没有数据可处理")
            return False
            
        try:
            # 打印标题和前两行
            print(f"\n 数据概览")
            print(f"数据形状: {self.df.shape[0]} 行 × {self.df.shape[1]} 列")
            print(f"列名: {list(self.df.columns)}")
            
            print(f"\n前两行数据:")
            print(self.df.head(2).to_string(index=False))
            
            # 存储列名
            self.column_names = list(self.df.columns)
            
            # 数据类型信息
            print(f"\n数据类型:")
            for col in self.df.columns:
                dtype = str(self.df[col].dtype)
                non_null = self.df[col].count()
                print(f"  {col}: {dtype} (非空值: {non_null})")
                
            return True
            
        except Exception as e:
            print(f"❌ 处理数据失败: {e}")
            return False

    def select_columns(self):
        """选择要可视化的列"""
        if not self.column_names:
            print("❌ 没有可用的列")
            return False
            
        print(f"\n 选择要可视化的列")
        print("可用列:")
        for i, col in enumerate(self.column_names, 1):
            print(f"  {i}. {col}")
        
        try:
            # 选择第一列
            col1_idx = int(input(f"\n请选择第一列 (1-{len(self.column_names)}): ")) - 1
            if col1_idx < 0 or col1_idx >= len(self.column_names):
                print("❌ 无效的列选择")
                return False
                
            col1 = self.column_names[col1_idx]
            
            # 选择第二列（可选）
            col2_idx = int(input(f"请选择第二列 (1-{len(self.column_names)})，或输入0跳过: ")) - 1
            if col2_idx == -1:
                # 单列可视化
                self.current_columns = [col1]
                print(f"✅ 选择单列: {col1}")
            elif col2_idx < 0 or col2_idx >= len(self.column_names):
                print("❌ 无效的列选择")
                return False
            else:
                col2 = self.column_names[col2_idx]
                if col2_idx == col1_idx:
                    print("❌ 不能选择相同的列")
                    return False
                self.current_columns = [col1, col2]
                print(f"✅ 选择列: {col1}, {col2}")
                
            return True
            
        except ValueError:
            print("❌ 请输入有效的数字")
            return False
        except Exception as e:
            print(f"❌ 选择列失败: {e}")
            return False

    def convert_to_numpy(self):
        """将选中的列转换为NumPy数组"""
        if not self.current_columns:
            print("❌ 没有选择列")
            return None, None
            
        try:
            if len(self.current_columns) == 1:
                # 单列：使用索引作为x轴
                x_data = np.arange(len(self.df))
                y_data = self.df[self.current_columns[0]].values
                print(f"✅ 转换单列数据: {self.current_columns[0]}")
                return x_data, y_data
            else:
                # 双列：第一列作为x轴，第二列作为y轴
                x_data = pd.to_numeric(self.df[self.current_columns[0]], errors='coerce').dropna()
                y_data = pd.to_numeric(self.df[self.current_columns[1]], errors='coerce').dropna()
                
                # 确保两个数组长度一致
                min_len = min(len(x_data), len(y_data))
                x_data = x_data[:min_len]
                y_data = y_data[:min_len]
                
                print(f"✅ 转换双列数据: {self.current_columns[0]} vs {self.current_columns[1]}")
                return x_data.values, y_data.values
                
        except Exception as e:
            print(f"❌ 转换为NumPy数组失败: {e}")
            return None, None

    def create_chart(self, x_data, y_data):
        """创建图表"""
        if x_data is None or y_data is None:
            return False
            
        try:
            # 选择图表类型
            print(f"\n 选择图表类型:")
            print("1. 散点图 (Scatter Plot)")
            print("2. 线形图 (Line Plot)")
            
            choice = input("请选择 (1-2): ").strip()
            
            if choice == '1':
                self._create_scatter_plot(x_data, y_data)
            elif choice == '2':
                self._create_line_plot(x_data, y_data)
            else:
                print("❌ 无效选择，使用默认散点图")
                self._create_scatter_plot(x_data, y_data)
                
            return True
            
        except Exception as e:
            print(f"❌ 创建图表失败: {e}")
            return False

    def _create_scatter_plot(self, x_data, y_data):
        """创建散点图"""
        plt.figure(figsize=(12, 8))
        
        if len(self.current_columns) == 1:
            plt.scatter(x_data, y_data, alpha=0.6, s=50, color='steelblue')
            plt.xlabel('索引')
            plt.ylabel(self.current_columns[0])
            plt.title(f'{self.current_columns[0]} 散点图')
        else:
            plt.scatter(x_data, y_data, alpha=0.6, s=50, color='steelblue')
            plt.xlabel(self.current_columns[0])
            plt.ylabel(self.current_columns[1])
            plt.title(f'{self.current_columns[0]} vs {self.current_columns[1]} 散点图')
        
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()
        
        self._explain_scatter_plot()

    def _create_line_plot(self, x_data, y_data):
        """创建线形图"""
        plt.figure(figsize=(12, 8))
        
        if len(self.current_columns) == 1:
            plt.plot(x_data, y_data, linewidth=2, color='steelblue', marker='o', markersize=4)
            plt.xlabel('索引')
            plt.ylabel(self.current_columns[0])
            plt.title(f'{self.current_columns[0]} 线形图')
        else:
            plt.plot(x_data, y_data, linewidth=2, color='steelblue', marker='o', markersize=4)
            plt.xlabel(self.current_columns[0])
            plt.ylabel(self.current_columns[1])
            plt.title(f'{self.current_columns[0]} vs {self.current_columns[1]} 线形图')
        
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()
        
        self._explain_line_plot()

    def _explain_scatter_plot(self):
        """解释散点图"""
        print(f"\n 散点图分析:")
        
        if len(self.current_columns) == 1:
            print(f"• 这是 {self.current_columns[0]} 列的散点图")
            print(f"• X轴表示数据点的索引位置")
            print(f"• Y轴表示 {self.current_columns[0]} 的实际值")
        else:
            print(f"• 这是 {self.current_columns[0]} 与 {self.current_columns[1]} 的关系散点图")
            print(f"• X轴表示 {self.current_columns[0]} 的值")
            print(f"• Y轴表示 {self.current_columns[1]} 的值")
        
        print("• 散点图适合观察数据的分布模式和相关性")
        print("• 如果点呈现某种趋势，说明两变量间可能存在关系")
        
        # 计算基本统计信息
        if len(self.current_columns) == 2:
            x_data = pd.to_numeric(self.df[self.current_columns[0]], errors='coerce').dropna()
            y_data = pd.to_numeric(self.df[self.current_columns[1]], errors='coerce').dropna()
            
            if len(x_data) > 0 and len(y_data) > 0:
                min_len = min(len(x_data), len(y_data))
                x_data = x_data[:min_len]
                y_data = y_data[:min_len]
                
                correlation = np.corrcoef(x_data, y_data)[0, 1]
                print(f"• 相关系数: {correlation:.3f}")
                
                if abs(correlation) > 0.7:
                    print("• 强相关性")
                elif abs(correlation) > 0.3:
                    print("• 中等相关性")
                else:
                    print("• 弱相关性")

    def _explain_line_plot(self):
        """解释线形图"""
        print(f"\n 线形图分析:")
        
        if len(self.current_columns) == 1:
            print(f"• 这是 {self.current_columns[0]} 列的时间序列图")
            print(f"• X轴表示数据点的索引位置")
            print(f"• Y轴表示 {self.current_columns[0]} 的实际值")
        else:
            print(f"• 这是 {self.current_columns[0]} 与 {self.current_columns[1]} 的关系线形图")
            print(f"• X轴表示 {self.current_columns[0]} 的值")
            print(f"• Y轴表示 {self.current_columns[1]} 的值")
        
        print("• 线形图适合观察数据的趋势和变化模式")
        print("• 可以清楚地看到数据的上升、下降或波动趋势")
        
        # 分析趋势
        if len(self.current_columns) == 2:
            x_data = pd.to_numeric(self.df[self.current_columns[0]], errors='coerce').dropna()
            y_data = pd.to_numeric(self.df[self.current_columns[1]], errors='coerce').dropna()
            
            if len(x_data) > 1 and len(y_data) > 1:
                min_len = min(len(x_data), len(y_data))
                x_data = x_data[:min_len]
                y_data = y_data[:min_len]
                
                # 计算趋势斜率
                if len(x_data) > 1:
                    slope = np.polyfit(x_data, y_data, 1)[0]
                    if slope > 0.01:
                        print("• 整体呈上升趋势")
                    elif slope < -0.01:
                        print("• 整体呈下降趋势")
                    else:
                        print("• 整体趋势相对平稳")

    def show_menu(self):
        """显示主菜单"""
        print("\n" + "="*60)
        print(" 数据图表浏览器")
        print("="*60)
        print("1. 从本地上传CSV文件")
        print("2. 从URL获取CSV文件")
        print("3. 从预设URL获取CSV文件")
        print("4. 查看当前数据")
        print("5. 选择列并创建图表")
        print("6. 退出")
        print("="*60)
    
    def run(self):
        """运行数据图表浏览器"""
        print(" 欢迎使用数据图表浏览器！")
        print("这个工具可以帮助您分析和可视化CSV数据")
        
        while True:
            self.show_menu()
            
            try:
                choice = input("\n请选择操作 (1-6): ").strip()
                
                if choice == '1':
                    if self.load_csv_from_upload():
                        self.process_dataframe()
                        
                elif choice == '2':
                    if self.load_csv_from_url_input():
                        self.process_dataframe()
                        
                elif choice == '3':
                    if self.load_csv_from_code_url():
                        self.process_dataframe()
                        
                elif choice == '4':
                    if self.df is not None:
                        self.process_dataframe()
                    else:
                        print("❌ 请先加载数据")
                        
                elif choice == '5':
                    if self.df is None:
                        print("❌ 请先加载数据")
                    else:
                        if self.select_columns():
                            x_data, y_data = self.convert_to_numpy()
                            if x_data is not None and y_data is not None:
                                self.create_chart(x_data, y_data)
                                
                elif choice == '6':
                    print(" 感谢使用数据图表浏览器！")
                    break
                    
                else:
                    print("❌ 无效选择，请输入1-6之间的数字")
                    
            except KeyboardInterrupt:
                print("\n\n 程序被中断，再见！")
                break
            except Exception as e:
                print(f"❌ 发生错误: {e}")
            
            input("\n按回车键继续...")

def main():
    """主函数"""
    try:
        explorer = DataChartExplorer()
        explorer.run()
    except Exception as e:
        print(f"❌ 程序运行错误: {e}")

if __name__ == "__main__":
    main()
