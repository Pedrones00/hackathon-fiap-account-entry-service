import AccountEntryModel from "./accountEntry.js";
import db from "../../config/db.js"

export default async () => {

    const AccountEntry = AccountEntryModel();

    await db.connection.sync({alter: true});

    return {
        AccountEntry
    }

}