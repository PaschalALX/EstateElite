from bs4 import BeautifulSoup

def strip_excess_spaces(data):
        ''' Strip excess spaces before validation '''
        for k, v in data.items():
            if type(v) == str:
                data[k] = v.strip()
        return data
            
def strip_html_tags(data):    
    ''' Strip html tags after validation '''
    for k, v in data.items():
        if type(v) == str:
            soup = BeautifulSoup(v, "html.parser")
            data[k] = soup.get_text()
    return data