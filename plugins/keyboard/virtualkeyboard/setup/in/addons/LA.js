VirtualKeyboard.Langs.LA = new function () {
    var self = this;
    var remap1 = {
 ga:'ǧa',ge:'ǧe',gi:'ǧi','go':'ǧo',gu:'ǧu',Ga:'Ʀa',Ge:'Ʀe',GI:'Ʀi',Go:'Ʀo',Gu:'Ʀu',GA:'ƦA',GE:'ƦE',GI:'ƦI',GO:'ƦO',GU:'ƦU'
,pha:'p\u021fa',pho:'p\u021fo',Pha:'P\u021fa',Pho:'P\u021fo',PHA:'P\u021ea',PHo:'P\u021eo'
,tha:'t\u021fa',tho:'t\u021fo',Tha:'T\u021fa',Tho:'T\u021fo',THa:'T\u021ea',THo:'T\u021eo'
,kha:'k\u021fa',kho:'k\u021fo',Kha:'K\u021fa',Kho:'K\u021fo',KHa:'K\u021ea',KHo:'K\u021eo'
,"a'":'á',"A'":'Á',"e'":'é',"E'":'É',"i'":'í',"I'":'Í',"u'":'ú',"U'":'Ú',"o'":'ó',"O'":'Ó'
    }

    ,remap4c = {
 'phun':'pȟuŋ','Phun':'Pȟuŋ','PHUN':'PȞUŊ'
,'thun':'tȟuŋ','Thun':'Tȟuŋ','THUN':'TȞUŊ'
,'khun':'kȟuŋ','Khun':'Kȟuŋ','KHUN':'KȞUŊ'
,'phún':'pȟúŋ','Phún':'Pȟúŋ','PHÚN':'PȞÚŊ'
,'thún':'tȟúŋ','Thún':'Tȟúŋ','THÚN':'TȞÚŊ'
,'khún':'kȟúŋ','Khún':'Kȟúŋ','KHÚN':'KȞÚŊ'
,'an':'aŋ','An':'Aŋ','AN':'AŊ'
,'in':'iŋ','In':'Iŋ','IN':'IŊ'
,'un':'uŋ','Un':'Uŋ','UN':'UŊ'
,'án':'áŋ','Án':'Áŋ','ÁN':'ÁŊ'
,'ín':'íŋ','Ín':'Íŋ','ÍN':'ÍŊ'
,'ún':'úŋ','Ún':'Úŋ','ÚN':'ÚŊ'
,'h':'\u021f', 'H':'\u021e'
    }

    ,remap0 = {
 'phúŋ':'pȟúŋ','Phúŋ':'Pȟúŋ','PHÚ':'PȞÚŊ'
,'thúŋ':'tȟúŋ','Thú':'Tȟúŋ','THÚŊ':'TȞÚŊ'
,'khúŋ':'kȟúŋ','Khúŋ':'Kȟú','KHÚ':'KȞÚŊ'
,'phúŋ':'pȟúŋ','Phúŋ':'Pȟú','PHÚ':'PȞÚ'
,'thúŋ':'tȟúŋ','Thúŋ':'Tȟú','THÚŊ':'TȞÚ'
,'khúŋ':'kȟúŋ','Khúŋ':'Kȟú','KHÚŊ':'KȞÚ'
,"p'":'pʼ',"P'":'Pʼ'
,"k'":'kʼ',"K'":'Kʼ'
,"t'":'tʼ',"T'":'Tʼ'
,"c'":'cʼ',"C'":'Cʼ'
,"s'":'sʼ',"S'":'Sʼ'
,"š'":'šʼ',"Š'":'Šʼ'
,"\u021f'":'\u021fʼ',"\u021e'":'\u021eʼ'
,"h'":'\u021fʼ',"H'":'\u021eʼ'
    }

    ,remap2 = {
 ph:'ph',Ph:'Ph',PH:'PH'
,th:'th',Th:'Th',TH:'TH'
,kh:'kh',Kh:'Kh',KH:'KH'
,an:'an',An:'An',AN:'AN'
,'in':'in',In:'In',IN:'IN'
,un:'un',Un:'Un',UN:'UN'
,'án':'án','Án':'Án','ÁN':'ÁN'
,'ín':'ín','Ín':'Ín','ÍN':'ÍN'
,'ún':'ún','Ún':'Ún','ÚN':'ÚN'
    }

    ,remap3 = {
 phu:'phu',Phu:'Phu',PHU:'PHU'
,thu:'thu',Thu:'Thu',THU:'THU'
,khu:'khu',Khu:'Khu',KHU:'KHU'
,"phu'":'phú',"Phu'":'Phú',"PHU'":'PHÚ'
,"thu'":'thú',"Thu'":'Thú',"THU'":'THÚ'
,"khu'":'khú',"Khu'":'Khú',"KHU'":'KHÚ'
    }

    ,remap4 = {
 'phun':'phun','Phun':'Phun','PHUN':'PHUN'
,'thun':'thun','Thun':'Thun','THUN':'THUN'
,'khun':'khun','Khun':'Khun','KHUN':'KHUN'
,'phún':'phún','Phún':'Phún','PHÚN':'PHÚN'
,'thún':'thún','Thún':'Thún','THÚN':'THÚN'
,'khún':'khún','Khún':'Khún','KHÚN':'KHÚN'
    }

    ,remap = {};

    var __construct = function() {
        var i,k
        var cons ="ǧwštypsdghȟkl'zžčbnmǦWŠTPSDGH\u021eKLZŽČBNM".split('')
        var punct =" .,<>;:\"?`~1!2@3#4$5%6^7&8*9(0)-_=+\|\u00A0".split('')
        for(k in remap0) remap[k]=[remap0[k],0]
        for(k in remap1) remap[k]=[remap1[k],1]
        for(k in remap2) remap[k]=[remap2[k],2]
        for(k in remap3) remap[k]=[remap3[k],3]
        for(k in remap4) remap[k]=[remap4[k],4]
        for(k in remap4c) {
            for(var i=0,cL=cons.length; i<cL; i++) 
                remap[k+cons[i]]=[remap4c[k]+(cons[i]=="'"? "ʼ": cons[i]),1];
            for(var i=0,pL=punct.length; i<pL; i++)
                remap[k+punct[i]]=[remap4c[k]+punct[i],0];
        }
        // clear come memory
        remap0=remap1=remap2=remap3=remap4=remap4c = null
        self.remap = remap;
    }
    __construct();
};
