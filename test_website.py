import unittest
import os
import re

class WebsiteStructureTest(unittest.TestCase):
    def setUp(self):
        self.pages = [
            'home.html',
            'about.html', 
            'research.html', 
            'projects.html', 
            'index.html'
        ]
        self.base_path = 'c:/Users/agastya/CascadeProjects/personal-portfolio'

    def test_pages_exist(self):
        """Check that all required pages exist"""
        for page in self.pages:
            file_path = os.path.join(self.base_path, page)
            self.assertTrue(os.path.exists(file_path), f"{page} is missing")

    def test_html_basic_validation(self):
        """Perform basic HTML validation"""
        for page in self.pages:
            file_path = os.path.join(self.base_path, page)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Check for basic HTML structure
                self.assertTrue(re.search(r'<!DOCTYPE\s+html>', content, re.IGNORECASE), 
                                f"Missing DOCTYPE in {page}")
                self.assertIn('<html', content, f"Missing <html> tag in {page}")
                self.assertIn('</html>', content, f"Missing </html> tag in {page}")
                self.assertIn('<head>', content, f"Missing <head> tag in {page}")
                self.assertIn('</head>', content, f"Missing </head> tag in {page}")
                self.assertIn('<body>', content, f"Missing <body> tag in {page}")
                self.assertIn('</body>', content, f"Missing </body> tag in {page}")

    def test_navigation_consistency(self):
        """Check that navigation is consistent across pages"""
        nav_items = ['Home', 'About', 'Research', 'Projects', 'Contact']
        
        for page in self.pages:
            file_path = os.path.join(self.base_path, page)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Check for navigation items
                for item in nav_items:
                    self.assertIn(item.lower(), content.lower(), 
                                  f"Navigation item '{item}' missing in {page}")

    def test_css_files_exist(self):
        """Check that CSS files exist"""
        css_files = [
            'c:/Users/agastya/CascadeProjects/personal-portfolio/css/styles.css'
        ]
        for css_file in css_files:
            self.assertTrue(os.path.exists(css_file), f"CSS file {css_file} is missing")

    def test_js_files_exist(self):
        """Check that JavaScript files exist"""
        js_files = [
            'c:/Users/agastya/CascadeProjects/personal-portfolio/js/main.js'
        ]
        for js_file in js_files:
            self.assertTrue(os.path.exists(js_file), f"JS file {js_file} is missing")

    def test_page_titles(self):
        """Check that each page has a meaningful title"""
        page_titles = {
            'home.html': 'Dr. Arjun Magotra - Home',
            'about.html': 'Dr. Arjun Magotra - About',
            'research.html': 'Dr. Arjun Magotra - Research',
            'projects.html': 'Dr. Arjun Magotra - Projects',
            'index.html': 'Dr Arjun Magotra - Contact'
        }
        
        for page, expected_title in page_titles.items():
            file_path = os.path.join(self.base_path, page)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                self.assertIn(f'<title>{expected_title}</title>', content, 
                              f"Incorrect or missing title in {page}")

if __name__ == '__main__':
    unittest.main()
