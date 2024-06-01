import eel
import sqlite3, json, os, math, shutil
from fpdf import FPDF

eel.init("web")

@eel.expose
def printItemInfo(id):
    eel.init("web")
    try:
        sqliteConnection = sqlite3.connect('database.db')
        cursor = sqliteConnection.cursor()
        print("Database created and Successfully Connected to SQLite")
        sql = "SELECT prod_num FROM products where id = '" + str(id) + "'"
        cursor.execute(sql)
        record = cursor.fetchall()
        rec = record[0][0]
        # for rec in record:
        projectPath = os.path.join(os.getcwd(),"CJProducts-pdf")
        if not os.path.exists(projectPath):
            os.mkdir(projectPath)

        pdfFile = os.path.join(projectPath , rec +".pdf")
        pdf = FPDF(unit = 'mm', format = (10,30))
        pdf.set_margins(0,0,0)
        pdf.c_margin = -1
        pdf.t_margin= 30
        pdf.add_page(orientation = 'P')
        pdf.set_font("Arial",size = 10)
        pdf.set_auto_page_break(False)
        pdf.rotate(90)
        pdf.cell(30, 10, txt = rec, border=1,
                ln = 1, align = 'C')
        # pdf.cell(150, 0, txt = "CRT57",
        #         ln = 1, align = 'C')
        print("Product Num:" + rec)

        if os.path.exists(pdfFile):
            os.remove(pdfFile)
        pdf.output(pdfFile) 
        cursor.close()
        path = pdfFile
        os.system(path)
        # 
        # 
        # automatic print of file 
        # method 1: os.startfile(path, 'print') 
        # method 2:
        # None - default printer, else put printer name
        # win32api.ShellExecute(0, "print", path, None, ".", 0)
        # http://timgolden.me.uk/python/win32_how_do_i/print.html

    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")

@eel.expose    
def getImage(prodNum, path):
    try:
        # if "\\" in path:
        #     path.replace("\\","\\\\")
        # print(path)


        # add loop to check where the file is
        
        img = os.path.join(path, prodNum + ".jpg")
        img2 = os.path.join(path, prodNum + ".png")

        if os.path.exists(img):
            file = prodNum + ".jpg"
        elif os.path.exists(img2):
            file = prodNum + ".png"
        else:
            sqliteConnection = sqlite3.connect('database.db')
            cursor = sqliteConnection.cursor()
            cursor.execute("SELECT * FROM imagePaths;")
            records = cursor.fetchall()

            file = prodNum + ".jpg"
            found = False
            for rec in records:
                if os.path.exists(os.path.join(rec[1], file)):
                    path = rec[1]
                    found = True
                    break
                
            if found == False:
                file = "logo.jpg"

        eel.init(path)
        return os.path.join("..", file)
    except sqlite3.Error as error:
        print("Error in getting image", error)

@eel.expose    
def saveItem(prodNum,gram,stone,stoneW,size,desc,desc2,price):
    eel.init("web")
    try:
        sqliteConnection = sqlite3.connect('database.db')
        cursor = sqliteConnection.cursor()
        print("Database created and Successfully Connected to SQLite")  

        cursor.execute("INSERT INTO products (prod_num,gram,stone,stoneW,size,other1, other2,price) VALUES (?,?,?,?,?,?,?,?)",(prodNum,gram,stone,stoneW,size,desc,desc2,price))
        sqliteConnection.commit()
        # record = cursor.fetchall()
        cursor.close()

    except sqlite3.Error as error:
        print("Error while saving object", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    # eel.start("index.html")

@eel.expose
def updateRecord(prodNum,gram,stone,stoneW,size,desc,desc2,price, id):
    eel.init("web")
    try:
        sqliteConnection = sqlite3.connect('database.db')
        cursor = sqliteConnection.cursor()
        print("Database created and Successfully Connected to SQLite")

        cursor.execute("UPDATE products SET prod_num = ?,stone = ?,stoneW = ?,size = ?,gram = ?,other1 = ?, other2 = ?, price = ? WHERE id = ?",(prodNum,stone,stoneW,size,gram,desc,desc2,price,id))
        sqliteConnection.commit()
        # record = cursor.fetchall()
        cursor.close()
    except sqlite3.Error as error:
        print("Error while updating record", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    # eel.start("index.html")

@eel.expose
def deleteRecord(id):
    eel.init("web")
    try:
        sqliteConnection = sqlite3.connect('database.db')
        cursor = sqliteConnection.cursor()
        print("Database created and Successfully Connected to SQLite")

        cursor.execute("DELETE FROM products WHERE id = '" + str(id) + "'")
        sqliteConnection.commit()
        # record = cursor.fetchall()
        cursor.close()

    except sqlite3.Error as error:
        print("Error while deleting record", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")

@eel.expose
def getPath():
    eel.init("web")
    try:
        sqliteConnection = sqlite3.connect('database.db')
        cursor = sqliteConnection.cursor()
        print("Database created and Successfully Connected to SQLite")  

        cursor.execute("SELECT * FROM imagePaths ORDER BY ID DESC LIMIT 1;")
        path = cursor.fetchall()

        if path == []:
            path = ""
        else:
            path = path[0][1]
        return path
    except sqlite3.Error as error:
        print("Error while retrieving object in getPath", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")

@eel.expose
def savePath(folderPath):
    eel.init("web")
    try:
        sqliteConnection = sqlite3.connect('database.db')
        cursor = sqliteConnection.cursor()
        print("Database created and Successfully Connected to SQLite")  

        cursor.execute("SELECT * FROM imagePaths")
        records = cursor.fetchall()

        found = False
        if records != []:
            for rec in records:
                if rec[1] == folderPath:
                    found = True
                    break
        # if not found:
        if found == False and folderPath != "":
            cursor.execute("INSERT INTO imagePaths (path) VALUES (?)",(folderPath,))
            sqliteConnection.commit()

        cursor.close()

    except sqlite3.Error as error:
        print("Error while saving object in savePath", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")

# def getRecordCount(state = "begin"):
def getRecordCount():
    eel.init("web")
    sqliteConnection = sqlite3.connect('database.db')
    cursor = sqliteConnection.cursor()
    cursor.execute(query)

    records = cursor.fetchall()
    count = int(records[0][0])

    # sql = query.replace("count(*)", "*, NTILE(" + str(pageCount) + ") OVER ( ORDER BY prod_num)")
    sql = query.replace("count(*)", "*")
    # rowCount is the number of cards to show each time more is pressed - 48 kermel ykoun el shakel mratab - multiple of 4
    # pageNumber is the page number of the record
    # rowNumber is the number of records  given a page number so far
    rowCount = 200
    pageNumber = 1
    maxPageNumber = math.ceil(count / rowCount)
    rowNumber = 0
 
    paginatedRecords = []
    while (pageNumber <= maxPageNumber):
        pager = sql + " LIMIT " + str(rowNumber) + " , " + str(rowCount)
        cursor.execute(pager)
        records = cursor.fetchall()
        
        for rec in records:
            rec += tuple(str(pageNumber))
            paginatedRecords.append(rec)
        
        rowNumber += rowCount
        pageNumber += 1

    return paginatedRecords

@eel.expose    
def main(param = "index", id = None,gram = None, stoneS = None, stoneW = None,size = None, desc = None, desc2 = None, price = None, gramFrom = None, gramTo = None, priceFrom = None, priceTo = None):
    # param will contain prod_num if search method is used else index or update
    eel.init("web")
    try:
        global query
        sqliteConnection = sqlite3.connect('database.db')
        cursor = sqliteConnection.cursor()
        print("Database created and Successfully Connected to SQLite")

        sql = "SELECT * FROM products"

        if param != "index" and param != "update":
            sql += " "
            if param == "" or param == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND prod_num LIKE '" + param + "%'"
                else:
                    sql += "WHERE prod_num LIKE '" + param + "%'"

            if gram == "" or gram == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND gram = " + str(gram)
                else:
                    sql += "WHERE gram = " + str(gram)

            if (gramFrom == "" or gramFrom == " ") or (gramTo == "" or gramTo == " "):
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND gram >= " + str(gramFrom) + " AND  gram <= " + str(gramTo)
                else:
                    sql += "WHERE gram >=  " + str(gramFrom) + " AND gram <= " + str(gramTo)

            if stoneS == "" or stoneS == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND stone LIKE '%" + stoneS + "%'"
                else:
                    sql += "WHERE stone LIKE '%" + stoneS + "%'"

            if stoneW == "" or stoneW == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND stoneW = " + str(stoneW)
                else:
                    sql += "WHERE stoneW = " + str(stoneW)

            if size == "" or size == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND size LIKE '%" + size + "%'"
                else:
                    sql += "WHERE size LIKE '%" + size + "%'"

            if desc == "" or desc == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND other1 LIKE '%" + desc + "%'"
                else:
                    sql += "WHERE other1 LIKE '%" + desc + "%'"

            if desc2 == "" or desc2 == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND other2 LIKE '%" + desc2 + "%'"
                else:
                    sql += "WHERE other2 LIKE '%" + desc2 + "%'"

            if price == "" or price == " ":
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND price LIKE " + price + ""
                else:
                    sql += "WHERE price LIKE " + price + ""

            if (priceFrom == "" or priceFrom == " ") or (priceTo == "" or priceTo == " "):
                pass
            else:
                if "WHERE" in sql:
                    sql += " AND price >= " + str(priceFrom) + " AND price <= " + str(priceTo)
                else:
                    sql += "WHERE price >= " + str(priceFrom) + " AND price <= " + str(priceTo)
        
        if param == "update":
            sql = "SELECT * FROM products WHERE id = " + str(id)
        else:
            sql += " ORDER BY prod_num"

        query = sql.replace("*","count(*)")
        # query = sql
        record = getRecordCount()
        result = json.loads("{}")
        for rec in record:
            result[rec[0]]= {
                "prod_num": rec[1],
                "gram": rec[2],
                "stone": rec[3],
                "stoneW": rec[4],
                "size":rec[5],
                "other1": rec[6],
                "other2": rec[7],
                "price":rec[8],
                "page": rec[9]
            }
        y = json.dumps(result)
        cursor.close()

    except sqlite3.Error as error:
        print("Error while connecting to sqlite", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")

    return json.loads(y)

# def close_callback(route, websockets):
    # print(websockets)
    # if not websockets:
    # web = os.path.join(os.getcwd(),'web')
    # os.system(os.path.join(os.path.join(web,'security'),'begin.py'))
    # exit()
    # pass

eel.start("index.html", cmdline_args=['--start-fullscreen'])

# 
# end of file