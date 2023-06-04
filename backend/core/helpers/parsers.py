from bs4 import BeautifulSoup

def major_parser(data):
    ''' Convert all string data to lowercase, 
        strips away excess spaces and html tags 
    '''
    for k, v in data.items():
        if type(v) == str:
            soup = BeautifulSoup(v.strip().lower(), "html.parser")
            data[k] = soup.get_text()
    return data