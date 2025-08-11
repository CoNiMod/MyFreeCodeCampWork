class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []
    
    def deposit(self, amount, description=""):
        """存款方法，接受金额和描述，如果没有提供描述则默认为空"""
        self.ledger.append({'amount': amount, 'description': description})
    
    def withdraw(self, amount, description=""):
        """取款方法，类似于存款但金额为负数，如果资金不足返回False"""
        if self.check_funds(amount):
            self.ledger.append({'amount': -amount, 'description': description})
            return True
        return False
    
    def get_balance(self):
        """根据已发生的存款和取款返回当前余额"""
        return sum(item['amount'] for item in self.ledger)
    
    def transfer(self, amount, other_category):
        """转账方法，从一个预算类别转移到另一个"""
        if self.check_funds(amount):
            self.withdraw(amount, f'Transfer to {other_category.name}')
            other_category.deposit(amount, f'Transfer from {self.name}')
            return True
        return False
    
    def check_funds(self, amount):
        """检查是否有足够的资金，金额大于余额返回False，否则返回True"""
        return amount <= self.get_balance()
    
    def __str__(self):
        """打印预算对象时的字符串表示"""
        # 标题行：30个字符，类别名称居中，用*包围
        title = self.name.center(30, '*')
        
        # 分类帐项目列表
        ledger_lines = []
        for item in self.ledger:
            description = item['description'][:23]  # 描述最多23个字符
            amount = f"{item['amount']:.2f}"  # 金额保留两位小数
            # 描述左对齐，金额右对齐，总长度30
            line = f"{description:<23}{amount:>7}"
            ledger_lines.append(line)
        
        # 总数行
        total = f"Total: {self.get_balance():.2f}"
        
        # 组合所有行
        return f"{title}\n" + "\n".join(ledger_lines) + f"\n{total}"


def create_spend_chart(categories):
    """创建支出图表，显示每个类别的支出百分比"""
    # 计算每个类别的总支出（只计算取款，不包括存款）
    category_spending = {}
    total_spent = 0
    
    for category in categories:
        spending = abs(sum(item['amount'] for item in category.ledger if item['amount'] < 0))
        category_spending[category.name] = spending
        total_spent += spending
    
    # 如果没有支出，返回空图表
    if total_spent == 0:
        return "Percentage spent by category\n100|          \n 90|          \n 80|          \n 70|          \n 60|          \n 50|          \n 40|          \n 30|          \n 20|          \n 10|          \n  0|          \n    ----------\n     "
    
    # 计算每个类别的支出百分比，并四舍五入到最接近的10
    percentages = {}
    for name, spending in category_spending.items():
        percentage = (spending / total_spent) * 100
        percentages[name] = int(percentage // 10) * 10  # 向下取整到最接近的10
    
    # 构建图表
    chart_lines = ["Percentage spent by category"]
    
    # 添加百分比行（从100到0）
    for i in range(100, -1, -10):
        line = f"{i:3}|"
        for category in categories:
            if percentages[category.name] >= i:
                line += " o "
            else:
                line += "   "
        chart_lines.append(line)
    
    # 添加水平线
    horizontal_line = "    " + "-" * (len(categories) * 3)
    chart_lines.append(horizontal_line)
    
    # 添加类别名称（垂直显示）
    max_name_length = max(len(cat.name) for cat in categories)
    for i in range(max_name_length):
        line = "    "
        for category in categories:
            if i < len(category.name):
                line += f" {category.name[i]} "
            else:
                line += "   "
        chart_lines.append(line)
    
    return "\n".join(chart_lines)


# 测试代码
if __name__ == "__main__":
    # 创建测试实例
    food = Category('Food')
    food.deposit(1000, 'deposit')
    food.withdraw(10.15, 'groceries')
    food.withdraw(15.89, 'restaurant and more food for dessert')
    
    clothing = Category('Clothing')
    food.transfer(50, clothing)
    
    # 打印食品类别
    print(food)
    print()
    
    # 打印服装类别
    print(clothing)
    print()
    
    # 创建支出图表
    categories = [food, clothing]
    chart = create_spend_chart(categories)
    print(chart)
