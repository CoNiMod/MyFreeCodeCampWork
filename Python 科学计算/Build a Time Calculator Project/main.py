def add_time(start, duration, start_day=None):
    """
    将持续时间添加到开始时间，并返回结果
    
    参数:
    start (str): 12小时制格式的开始时间 (例如: '3:00 PM')
    duration (str): 持续时间，格式为 '小时:分钟' (例如: '3:10')
    start_day (str, optional): 一周的开始日期 (例如: 'Monday')
    
    返回:
    str: 计算后的时间，包含日期变化信息
    """
    
    # 解析开始时间
    time_part, period = start.split()
    start_hour, start_minute = map(int, time_part.split(':'))
    
    # 转换为24小时制
    if period == 'PM' and start_hour != 12:
        start_hour += 12
    elif period == 'AM' and start_hour == 12:
        start_hour = 0
    
    # 解析持续时间
    dur_hour, dur_minute = map(int, duration.split(':'))
    
    # 计算总分钟数
    total_minutes = start_hour * 60 + start_minute + dur_hour * 60 + dur_minute
    
    # 计算天数
    days_passed = total_minutes // (24 * 60)
    remaining_minutes = total_minutes % (24 * 60)
    
    # 转换回12小时制
    new_hour = remaining_minutes // 60
    new_minute = remaining_minutes % 60
    
    # 确定AM/PM
    if new_hour == 0:
        new_period = 'AM'
        new_hour = 12
    elif new_hour == 12:
        new_period = 'PM'
    elif new_hour > 12:
        new_period = 'PM'
        new_hour -= 12
    else:
        new_period = 'AM'
    
    # 构建时间字符串
    time_str = f"{new_hour}:{new_minute:02d} {new_period}"
    
    # 处理星期几
    if start_day:
        days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        start_day_index = days.index(start_day.lower())
        new_day_index = (start_day_index + days_passed) % 7
        new_day = days[new_day_index].capitalize()
        time_str += f", {new_day}"
    
    # 添加日期变化信息
    if days_passed == 1:
        time_str += " (next day)"
    elif days_passed > 1:
        time_str += f" ({days_passed} days later)"
    
    return time_str


# 测试函数
if __name__ == "__main__":
    # 测试用例
    print(add_time('3:00 PM', '3:10'))  # 6:10 PM
    print(add_time('11:30 AM', '2:32', 'Monday'))  # 2:02 PM, Monday
    print(add_time('11:43 AM', '00:20'))  # 12:03 PM
    print(add_time('10:10 PM', '3:30'))  # 1:40 AM (next day)
    print(add_time('11:43 PM', '24:20', 'tueSday'))  # 12:03 AM, Thursday (2 days later)
    print(add_time('6:30 PM', '205:12'))  # 7:42 AM (9 days later)
