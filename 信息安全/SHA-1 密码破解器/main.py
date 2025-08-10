from password_cracker import crack_sha1_hash

def main():
    """测试密码破解功能"""
    
    print("SHA-1 密码破解器测试")
    print("=" * 50)
    
    # 测试用例1：不使用盐值
    print("\n测试1：不使用盐值")
    print("-" * 30)
    
    test_hash1 = "b305921a3723cd5d70a375cd21a61e60aabb84ec"
    result1 = crack_sha1_hash(test_hash1, use_salts=False)
    print(f"哈希: {test_hash1}")
    print(f"预期结果: sammy123")
    print(f"实际结果: {result1}")
    print(f"测试{'通过' if result1 == 'sammy123' else '失败'}")
    
    test_hash2 = "c7ab388a5ebefbf4d550652f1eb4d833e5316e3e"
    result2 = crack_sha1_hash(test_hash2, use_salts=False)
    print(f"\n哈希: {test_hash2}")
    print(f"预期结果: abacab")
    print(f"实际结果: {result2}")
    print(f"测试{'通过' if result2 == 'abacab' else '失败'}")
    
    test_hash3 = "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"
    result3 = crack_sha1_hash(test_hash3, use_salts=False)
    print(f"\n哈希: {test_hash3}")
    print(f"预期结果: password")
    print(f"实际结果: {result3}")
    print(f"测试{'通过' if result3 == 'password' else '失败'}")
    
    # 测试用例2：使用盐值
    print("\n\n测试2：使用盐值")
    print("-" * 30)
    
    test_hash4 = "53d8b3dc9d39f0184144674e310185e41a87ffd5"
    result4 = crack_sha1_hash(test_hash4, use_salts=True)
    print(f"哈希: {test_hash4}")
    print(f"预期结果: superman")
    print(f"实际结果: {result4}")
    print(f"测试{'通过' if result4 == 'superman' else '失败'}")
    
    test_hash5 = "da5a4e8cf89539e66097acd2f8af128acae2f8ae"
    result5 = crack_sha1_hash(test_hash5, use_salts=True)
    print(f"\n哈希: {test_hash5}")
    print(f"预期结果: q1w2e3r4t5")
    print(f"实际结果: {result5}")
    print(f"测试{'通过' if result5 == 'q1w2e3r4t5' else '失败'}")
    
    test_hash6 = "ea3f62d498e3b98557f9f9cd0d905028b3b019e1"
    result6 = crack_sha1_hash(test_hash6, use_salts=True)
    print(f"\n哈希: {test_hash6}")
    print(f"预期结果: bubbles1")
    print(f"实际结果: {result6}")
    print(f"测试{'通过' if result6 == 'bubbles1' else '失败'}")
    
    # 测试用例3：不存在的哈希
    print("\n\n测试3：不存在的哈希")
    print("-" * 30)
    
    fake_hash = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    result7 = crack_sha1_hash(fake_hash, use_salts=False)
    print(f"哈希: {fake_hash}")
    print(f"预期结果: 密码不在数据库中")
    print(f"实际结果: {result7}")
    print(f"测试{'通过' if result7 == '密码不在数据库中' else '失败'}")

if __name__ == "__main__":
    main()
