import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            db: [] as any,
            sqlite: [] as any,
        }
    },
    methods: {
        async system() {
            await window.database.checkConnection('METHOD::system');
            let cnxObj = await window.database.cnx();
            const db = cnxObj.db;
            // const sqlite = cnxObj.sqlite;
            // const isDatabase = await sqlite.isDatabase('conteo.db');
            // console.log(isDatabase);

            // let exi = await db.isExists();
            // let exiT = await db.isTable("Ubicaciones");
            // let getexi = await db.getTableList();
            // console.log(getexi);
            // console.log(exiT);
            // console.log(exi);
            let ejecute = true;
            if (ejecute) {
                await db.executeTransaction([
                    { statement: 'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, email VARCHAR(31), name TEXT NOT NULL, token VARCHAR(300), createddate DATETIME)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS transition_variable (id INTEGER PRIMARY KEY AUTOINCREMENT, key VARCHAR(50), value VARCHAR(50))', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS permission (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, PageCode VARCHAR(31), ObjectCode VARCHAR(31), Permission BOOLEAN, createddate DATETIME)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS Productos (id INTEGER PRIMARY KEY AUTOINCREMENT, itemnmbr NVARCHAR(25), itemdesc NVARCHAR(150), inactive BOOLEAN, secuence_id INTEGER)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS user_dynamic (id INTEGER PRIMARY KEY AUTOINCREMENT, user_dynamic_id INTEGER NOT NULL, login VARCHAR(100), fullname VARCHAR(100), event BOOLEAN)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS Ubicaciones ( id INTEGER PRIMARY KEY AUTOINCREMENT, Ubicaciones_id INTEGER NOT NULL, ref1 NVARCHAR(250), ref2 NVARCHAR(250), name NVARCHAR(250), status INTEGER, secuence_id INTEGER, createddate DATETIME, modififieddate DATETIME, trash BOOLEAN, trashddate DATETIME)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS entityQueue (id INTEGER PRIMARY KEY AUTOINCREMENT, method VARCHAR(100), type VARCHAR(100), entity VARCHAR(100), objects VARCHAR(500), status BOOLEAN, ti_id INTEGER DEFAULT 0, tg_id INTEGER DEFAULT 0, tc_id INTEGER DEFAULT 0, tgu_id INTEGER DEFAULT 0, tid_id INTEGER DEFAULT 0)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS TomaInventario (id INTEGER PRIMARY KEY AUTOINCREMENT, TomaInventario_id INTEGER NOT NULL, name NVARCHAR(100), initdate DATETIME, enddate DATETIME, status INTEGER, secuence_id INTEGER, createddate DATETIME, modififieddate DATETIME, trash BOOLEAN, trashddate DATETIME)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS TomaInventarioDetalle (id INTEGER PRIMARY KEY AUTOINCREMENT, ti_id INTEGER DEFAULT 0, TomaInventarioDetalle_id INTEGER NOT NULL, TomaInventario_Id INTEGER, TomaConteo_Id INTEGER, TomaGrupo_Id INTEGER, Ubicaciones_id INTEGER, Ubicaciones_name VARCHAR(101), itemnmbr VARCHAR(31), itemdesc VARCHAR(101), quantity INTEGER, secuence_id INTEGER, createddate DATETIME, modififieddate DATETIME, trash BOOLEAN, trashddate DATETIME)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS TomaGrupo (id INTEGER PRIMARY KEY AUTOINCREMENT, ti_id INTEGER DEFAULT 0, tc_id INTEGER DEFAULT 0, TomaGrupo_id INTEGER NOT NULL, TomaInventario_Id INTEGER, TomaConteo_Id INTEGER, name NVARCHAR(100), status INTEGER, event BOOLEAN, operadores NVARCHAR(250), secuence_id INTEGER, createddate DATETIME, modififieddate DATETIME, trash BOOLEAN, trashddate DATETIME)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS TomaGrupo_users (id INTEGER PRIMARY KEY AUTOINCREMENT, ti_id INTEGER DEFAULT 0, tg_id INTEGER DEFAULT 0, TomaGrupoUsers_id INTEGER NOT NULL, user_id INTEGER NOT NULL, TomaGrupo_id INTEGER NOT NULL, fullname NVARCHAR(100), status INTEGER, event BOOLEAN, secuence_id INTEGER, createddate DATETIME, modififieddate DATETIME, trash BOOLEAN, trashddate DATETIME)', values: [] },
                    { statement: 'CREATE TABLE IF NOT EXISTS TomaConteo (id INTEGER PRIMARY KEY AUTOINCREMENT, ti_id INTEGER DEFAULT 0, TomaConteo_id INTEGER NOT NULL, TomaInventario_Id INTEGER, ConteoNumero SMALLINT, name NVARCHAR(100), status INTEGER, secuence_id INTEGER, createddate DATETIME, modififieddate DATETIME, trash BOOLEAN, trashddate DATETIME)', values: [] },
                ]);

                const sql = 'SELECT * FROM user';
                let val = await db.query(sql);
                await db.close();
                await window.database.checkConnection('METHOD::systemEND');
                return val;
            } else {
                // elimina las tablas
                await db.delete();
                window.localStorage.clear();
                await window.database.checkConnection('METHOD::systemEND');
            }
        },
    },
});