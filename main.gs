const SH = SpreadsheetApp.getActiveSheet();
const ORIGINAL_COL = 4; // col of original
const TRANSLATED_COL = 5; // col of translated
const EXCEPT_SHTS = ["まとめ"]; // 翻訳しないシート名リスト

function onEdit(e) {
  try{
    const shtName = e.source.getSheetName();
    const row = e.range.getRow();
    const col = e.range.getColumn();
    const val = e.range.getValues();
                     
    if(EXCEPT_SHTS.indexOf(shtName) >= 0) {
      return 0;
    }
    
    if(col === ORIGINAL_COL && SH.getRange(row, TRANSLATED_COL).getValue() === ""){
      const translatedText = LanguageApp.translate(SH.getRange(row, ORIGINAL_COL).getValue(),"en","ja");
      SH.getRange(row, TRANSLATED_COL).setValue(translatedText)
    }
  }catch(e){
    Browser.msgBox(e.stack);
  }
}  

