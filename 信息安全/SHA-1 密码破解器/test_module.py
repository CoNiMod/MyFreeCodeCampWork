import unittest
from password_cracker import crack_sha1_hash

class TestPasswordCracker(unittest.TestCase):
    """测试密码破解器功能"""
    
    def test_crack_sha1_hash_no_salts(self):
        """测试不使用盐值的密码破解"""
        # 测试用例1
        result = crack_sha1_hash("b305921a3723cd5d70a375cd21a61e60aabb84ec", use_salts=False)
        self.assertEqual(result, "sammy123")
        
        # 测试用例2
        result = crack_sha1_hash("c7ab388a5ebefbf4d550652f1eb4d833e5316e3e", use_salts=False)
        self.assertEqual(result, "abacab")
        
        # 测试用例3
        result = crack_sha1_hash("5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8", use_salts=False)
        self.assertEqual(result, "password")
    
    def test_crack_sha1_hash_with_salts(self):
        """测试使用盐值的密码破解"""
        # 测试用例1
        result = crack_sha1_hash("53d8b3dc9d39f0184144674e310185e41a87ffd5", use_salts=True)
        self.assertEqual(result, "superman")
        
        # 测试用例2
        result = crack_sha1_hash("da5a4e8cf89539e66097acd2f8af128acae2f8ae", use_salts=True)
        self.assertEqual(result, "q1w2e3r4t5")
        
        # 测试用例3
        result = crack_sha1_hash("ea3f62d498e3b98557f9f9cd0d905028b3b019e1", use_salts=True)
        self.assertEqual(result, "bubbles1")
    
    def test_crack_sha1_hash_not_found(self):
        """测试找不到密码的情况"""
        fake_hash = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        result = crack_sha1_hash(fake_hash, use_salts=False)
        self.assertEqual(result, "密码不在数据库中")
        
        result = crack_sha1_hash(fake_hash, use_salts=True)
        self.assertEqual(result, "密码不在数据库中")
    
    def test_crack_sha1_hash_edge_cases(self):
        """测试边界情况"""
        # 空字符串
        result = crack_sha1_hash("", use_salts=False)
        self.assertEqual(result, "密码不在数据库中")
        
        # 无效哈希长度
        result = crack_sha1_hash("invalid_hash", use_salts=False)
        self.assertEqual(result, "密码不在数据库中")

if __name__ == '__main__':
    unittest.main()