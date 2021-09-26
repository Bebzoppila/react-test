from flask import Flask,jsonify
from flask_cors import CORS
import sqlite3
app = Flask(__name__)
CORS(app)

def ToNormalViewTableDate(table_date):
    result = []
    for table_item in table_date:
        result.append({
        'id':table_item[0],
        'date': table_item[1], 
        'name': table_item[2],
        'distance':table_item[3],
        'quantity':table_item[4],
        })
    return (result)


@app.route('/')
def index():
    return 'Hello World'

@app.route('/api/v1/table-data')
def TableData():
    conn = sqlite3.connect("mydatabase.db")
    cursor = conn.cursor()
    cursor.execute('SELECT id,date,name,distance,quantity FROM task')
    result =  ToNormalViewTableDate(cursor.fetchall())
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)