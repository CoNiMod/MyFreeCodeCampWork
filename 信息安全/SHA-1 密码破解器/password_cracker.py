import hashlib

def crack_sha1_hash(hash_value, use_salts=False):
    """
    破解SHA-1哈希密码
    
    Args:
        hash_value (str): 要破解的SHA-1哈希值
        use_salts (bool): 是否使用盐值，默认为False
    
    Returns:
        str: 如果找到密码则返回密码，否则返回"密码不在数据库中"
    """
    
    # 读取前10,000个密码
    try:
        with open('top-10000-passwords.txt', 'r', encoding='utf-8') as f:
            passwords = [line.strip() for line in f.readlines()]
    except FileNotFoundError:
        return "密码不在数据库中"
    
    # 如果不使用盐值，直接比较哈希
    if not use_salts:
        for password in passwords:
            if hashlib.sha1(password.encode('utf-8')).hexdigest() == hash_value:
                return password
    else:
        # 读取盐值
        try:
            with open('known-salts.txt', 'r', encoding='utf-8') as f:
                salts = [line.strip() for line in f.readlines()]
        except FileNotFoundError:
            return "密码不在数据库中"
        
        # 对每个密码尝试添加盐值（前缀和后缀）
        for password in passwords:
            for salt in salts:
                # 尝试盐值作为前缀
                salted_password = salt + password
                if hashlib.sha1(salted_password.encode('utf-8')).hexdigest() == hash_value:
                    return password
                
                # 尝试盐值作为后缀
                salted_password = password + salt
                if hashlib.sha1(salted_password.encode('utf-8')).hexdigest() == hash_value:
                    return password
    
    return "密码不在数据库中"
