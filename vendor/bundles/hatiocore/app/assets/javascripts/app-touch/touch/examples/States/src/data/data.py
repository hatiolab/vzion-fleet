import urllib2, json, StringIO, gzip, re

indices = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 72, 44, 45, 46, 47, 48, 49, 50, 51, 53, 54, 55, 56]

def get_data():
  ans = {}
  with open('_States_location.csv', 'r') as f:
    csv = f.read().split('\n')
    with open('states.json', 'w') as fstates:
      for idx, i in enumerate(indices):
        abbr = csv[idx].split(',')[0]
        entry = ans[abbr] = {}
        print i 
        
        for table in ['P1', 'P3', 'P12', 'P13']:
          url = 'http://censusdata.ire.org/%02d/all_040_in_%02d.%s.csv' % (i, i, table)
          # print url
          lines = gzip.GzipFile(fileobj=StringIO.StringIO(urllib2.urlopen(url).read())).read().split('\n')
          titles = lines[0].split(',')
          values = lines[1].split(',')

          parse(table, titles, values, entry)

        counties = {}
        
        with open('counties_' + abbr + '.json', 'w') as fcounties:
          for table2 in ['P1', 'P3', 'P12', 'P13']:
            url = 'http://censusdata.ire.org/%02d/all_050_in_%02d.%s.csv' % (i, i, table2)
            lines = gzip.GzipFile(fileobj=StringIO.StringIO(urllib2.urlopen(url).read())).read().split('\r\n')
            titles = lines[0].split(',')
            for idx, line in enumerate(lines):
              try:
                if idx > 0:
                  values = line.split(',')
                  # print titles, values
                  entry = counties.get(values[8], {})
                  counties[values[8]] = entry
                  parse(table2, titles, values, entry)
                  
              except:
                pass
          
          fcounties.write(json.dumps(counties))

      fstates.write(json.dumps(ans))

def parse(table, titles, values, entry):
  if table == 'P1':
    for idx, title in enumerate(titles):
      entry[title] = values[idx].replace('\r', '')
  
  elif table == 'P3':
    names = ['White', 'Black', 'American Indian or Alaska', 'Asian', 'Native Hawaiian', 'Other Race', 'Two or More Races']

    vals = entry['race'] = []

    for idx, title in enumerate(titles):
      match = re.match('^P003(\d+)$', title)
      if match:
        index = int(match.group(1)) -2
        if index >= 0:
          vals.append({ 
            'name': names[index], 
            'value': int(values[idx].replace('\r', '')) 
          })

  elif table == 'P12':
    names = ['Under 5 years', 
             '5 to 9 years', 
             '10 to 14 years', 
             '15 to 17 years', 
             '18 and 19 years', 
             '20 years',
             '21 years',
             '22 to 24 years',
             '25 to 29 years',
             '30 to 34 years',
             '35 to 39 years',
             '40 to 44 years',
             '45 to 49 years',
             '50 to 54 years',
             '55 to 59 years',
             '60 to 61 years',
             '62 to 64 years',
             '65 and 66 years',
             '67 to 69 years',
             '70 to 74 years',
             '75 to 79 years',
             '80 to 84 years',
             '85 years and over']

    vals = entry['sex_by_age'] = []

    for idx, title in enumerate(titles):
      match = re.match('^P012(\d+)$', title)
      
      if match:
        index = int(match.group(1).replace('\r', ''))
        
        if index < 26:
          index -= 3
        else:
          continue

        if index < 0: continue

        vals.append({ 
          'name': names[index], 
          'male': float(values[idx].replace('\r', '')), 
          'female': float(values[idx + (23 + 1) * 2].replace('\r', '')) 
        })

  elif table == 'P13':
    names = ['Male', 
             'Female']

    vals = entry['age_by_sex'] = []

    for idx, title in enumerate(titles):
      match = re.match('^P013(\d+)$', title)
      if match:
        index = int(match.group(1)) -2

        if index >= 0:
        
          vals.append({ 
            'name': names[index], 
            'value': float(values[idx].replace('\r', ''))
          })


if __name__ == '__main__':
  get_data()

