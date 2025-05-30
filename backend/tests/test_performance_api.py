import unittest
import subprocess
import shutil

class TestPerformanceAPI(unittest.TestCase):
    def test_performance(self):
        # Check if autocannon is installed
        if not shutil.which("autocannon"):
            self.skipTest("autocannon is not installed or not in PATH, skipping performance test")
        try:
            result = subprocess.run(
                ["autocannon", "-d", "5", "-c", "10", "http://127.0.0.1:6543/products_list"],
                capture_output=True,
                text=True,
                check=True
            )
            print(result.stdout)
            self.assertIn("Requests/sec", result.stdout)
        except subprocess.CalledProcessError as e:
            self.fail(f"Performance test failed: {e}")

if __name__ == "__main__":
    unittest.main()
