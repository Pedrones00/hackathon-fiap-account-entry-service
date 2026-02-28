class AccountResponseDTO {
    constructor(accountEntryObject) {
        this.id = accountEntryObject.id;
        this.cpf = accountEntryObject.cpf;
        this.agency = accountEntryObject.agency;
        this.account = accountEntryObject.account;
        this.entry_name = accountEntryObject.entryName;
        this.value = accountEntryObject.value;
        this.entry_type = accountEntryObject.entryType;
        this.entry_ts = accountEntryObject.entryTs;
        this.is_categorized = accountEntryObject.isCategorized;
        this.category = accountEntryObject.category;
    }
}

export default AccountResponseDTO;