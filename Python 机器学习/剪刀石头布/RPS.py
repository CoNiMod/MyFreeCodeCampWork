def player(prev_play, opponent_history=[]):
    # 添加对手的上一手到历史记录中
    if prev_play:
        opponent_history.append(prev_play)
    
    # 如果历史记录为空，随机选择
    if not opponent_history:
        return "R"
    
    # 策略1: 针对Quincy的固定循环模式
    if len(opponent_history) >= 5:
        quincy_pattern = ["R", "R", "P", "P", "S"]
        last_five = opponent_history[-5:]
        if last_five == quincy_pattern:
            # 预测Quincy的下一步并击败它
            next_quincy = quincy_pattern[len(opponent_history) % 5]
            if next_quincy == "R":
                return "P"
            elif next_quincy == "P":
                return "S"
            else:  # S
                return "R"
    
    # 策略2: 针对Kris的反制策略
    # Kris总是选择能击败对手上一步的选项
    # 关键洞察：如果我们总是选择相同的选项，Kris就会总是选择能击败我们的选项
    # 解决方案：使用一个简单的循环模式，让Kris无法预测
    if len(opponent_history) >= 2:
        # 检查是否是Kris的反制模式
        kris_pattern = True
        for i in range(1, len(opponent_history)):
            if opponent_history[i] != get_counter(opponent_history[i-1]):
                kris_pattern = False
                break
        
        if kris_pattern:
            # 使用循环模式：R -> P -> S -> R
            cycle = ["R", "P", "S"]
            return cycle[len(opponent_history) % 3]
    
    # 策略3: 针对Mrugesh的频率分析策略
    if len(opponent_history) >= 10:
        # 分析最近10步的频率
        last_ten = opponent_history[-10:]
        most_frequent = max(set(last_ten), key=last_ten.count)
        
        # 选择能击败最频繁选择的选项
        if most_frequent == "R":
            return "P"
        elif most_frequent == "P":
            return "S"
        else:  # S
            return "R"
    
    # 策略4: 针对Abbey的马尔可夫链策略
    if len(opponent_history) >= 3:
        # 分析两步组合的模式
        last_two = "".join(opponent_history[-2:])
        if len(last_two) == 2:
            # 预测基于两步组合的下一步
            if last_two == "RR":
                return "P"  # 石头后通常还是石头
            elif last_two == "PP":
                return "S"  # 布后通常还是布
            elif last_two == "SS":
                return "R"  # 剪刀后通常是剪刀
            elif last_two in ["RP", "PR"]:
                return "S"  # 石头布组合后通常是剪刀
            elif last_two in ["RS", "SR"]:
                return "P"  # 石头剪刀组合后通常是布
            elif last_two in ["PS", "SP"]:
                return "R"  # 布剪刀组合后通常是石头
    
    # 策略5: 混合策略 - 根据历史长度选择不同策略
    if len(opponent_history) >= 2:
        # 如果对手最近两步相同，选择能击败它的选项
        if opponent_history[-1] == opponent_history[-2]:
            return get_counter(opponent_history[-1])
        else:
            # 如果对手最近两步不同，选择能击败最后一步的选项
            return get_counter(opponent_history[-1])
    
    # 默认策略：选择能击败对手最后一步的选项
    return get_counter(opponent_history[-1])

def get_counter(play):
    """返回能击败给定选择的选项"""
    if play == "R":
        return "P"
    elif play == "P":
        return "S"
    else:  # S
        return "R"
