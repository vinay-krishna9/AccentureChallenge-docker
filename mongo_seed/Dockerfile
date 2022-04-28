FROM mongo

COPY aqi.json /aqi.json

CMD mongoimport --host mongo --db XCompany --collection aqi --drop --file /aqi.json --jsonArray
