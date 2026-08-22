
const RANDOM64 = [
0x9D39247E33776D41n,0x2AF7398005AAA5C7n,0x44DB015024623547n,0x9C15F73E62A76AE2n,
0x75834465489C0C89n,0x3290AC3A203001BFn,0x0FBBAD1F61042279n,0xE83A908FF2FB60CAn,
0x0D7E765D58755C10n,0x1A083822CEAFE02Dn,0x9605D5F0E25EC3B0n,0xD021FF5CD13A2ED5n,
0x40BDF15D4A672E32n,0x011355146FD56395n,0x5DB4832046F3D9E5n,0x239F8B2D7FF719CCn,
0x05D1A1AE85B49AA1n,0x679F848F6E8FC971n,0x7449BBFF801FED0Bn,0x7D11CDB1C3B7ADF0n,
0x82C7709E781EB7CCn,0xF3218F1C9510786Cn,0x331478F3AF51BBE6n,0x4BB38DE5E7219443n,
0xAA649C6EBCFD50FCn,0x8DBD98A352AFD40Bn,0x87D2074B81D79217n,0x19F3C751D3E92AE1n,
0xB4AB30F062B19ABFn,0x7B0500AC42047AC4n,0xC9452CA81A09D85Dn,0x24AA6C514DA27500n,
0x4C9F34427501B447n,0x14A68FD73C910841n,0xA71B9B83461CBD93n,0x03488B95B0F1850Fn,
0x637B2B34FF93C040n,0x09D1BC9A3DD90A94n,0x3575668334A1DD3Bn,0x735E2B97A4C45A23n,
0x18727070F1BD400Bn,0x1FCBACD259BF02E7n,0xD310A7C2CE9B6555n,0xBF983FE0FE5D8244n,
0x9F74D14F7454A824n,0x51EBDC4AB9BA3035n,0x5C82C505DB9AB0FAn,0xFCF7FE8A3430B241n,
0x3253A729B9BA3DDEn,0x8C74C368081B3075n,0xB9BC6C87167C33E7n,0x7EF48F2B83024E20n,
0x11D505D4C351BD7Fn,0x6568FCA92C76A243n,0x4DE0B0F40F32A7B8n,0x96D693460CC37E5Dn,
0x42E240CB63689F2Fn,0x6D2BDCDAE2919661n,0x42880B0236E4D951n,0x5F0F4A5898171BB6n,
0x39F890F579F92F88n,0x93C5B5F47356388Bn,0x63DC359D8D231B78n,0xEC16CA8AEA98AD76n,
0x5355F900C2A82DC7n,0x07FB9F855A997142n,0x5093417AA8A7ED5En,0x7BCBC38DA25A7F3Cn,
0x19FC8A768CF4B6D4n,0x637A7780DECFC0D9n,0x8249A47AEE0E41F7n,0x79AD695501E7D1E8n,
0x14ACBAF4777D5776n,0xF145B6BECCDEA195n,0xDABF2AC8201752FCn,0x24C3C94DF9C8D3F6n,
0xBB6E2924F03912EAn,0x0CE26C0B95C980D9n,0xA49CD132BFBF7CC4n,0xE99D662AF4243939n,
0x27E6AD7891165C3Fn,0x8535F040B9744FF1n,0x54B3F4FA5F40D873n,0x72B12C32127FED2Bn,
0xEE954D3C7B411F47n,0x9A85AC909A24EAA1n,0x70AC4CD9F04F21F5n,0xF9B89D3E99A075C2n,
0x87B3E2B2B5C907B1n,0xA366E5B8C54F48B8n,0xAE4A9346CC3F7CF2n,0x1920C04D47267BBDn,
0x87BF02C6B49E2AE9n,0x092237AC237F3859n,0xFF07F64EF8ED14D0n,0x8DE8DCA9F03CC54En,
0x9C1633264DB49C89n,0xB3F22C3D0B0B38EDn,0x390E5FB44D01144Bn,0x5BFEA5B4712768E9n,
0x1E1032911FA78984n,0x9A74ACB964E78CB3n,0x4F80F7A035DAFB04n,0x6304D09A0B3738C4n,
0x2171E64683023A08n,0x5B9B63EB9CEFF80Cn,0x506AACF489889342n,0x1881AFC9A3A701D6n,
0x6503080440750644n,0xDFD395339CDBF4A7n,0xEF927DBCF00C20F2n,0x7B32F7D1E03680ECn,
0xB9FD7620E7316243n,0x05A7E8A57DB91B77n,0xB5889C6E15630A75n,0x4A750A09CE9573F7n,
0xCF464CEC899A2F8An,0xF538639CE705B824n,0x3C79A0FF5580EF7Fn,0xEDE6C87F8477609Dn,
0x799E81F05BC93F31n,0x86536B8CF3428A8Cn,0x97D7374C60087B73n,0xA246637CFF328532n,
0x043FCAE60CC0EBA0n,0x920E449535DD359En,0x70EB093B15B290CCn,0x73A1921916591CBDn,
0x56436C9FE1A1AA8Dn,0xEFAC4B70633B8F81n,0xBB215798D45DF7AFn,0x45F20042F24F1768n,
0x930F80F4E8EB7462n,0xFF6712FFCFD75EA1n,0xAE623FD67468AA70n,0xDD2C5BC84BC8D8FCn,
0x7EED120D54CF2DD9n,0x22FE545401165F1Cn,0xC91800E98FB99929n,0x808BD68E6AC10365n,
0xDEC468145B7605F6n,0x1BEDE3A3AEF53302n,0x43539603D6C55602n,0xAA969B5C691CCB7An,
0xA87832D392EFEE56n,0x65942C7B3C7E11AEn,0xDED2D633CAD004F6n,0x21F08570F420E565n,
0xB415938D7DA94E3Cn,0x91B859E59ECB6350n,0x10CFF333E0ED804An,0x28AED140BE0BB7DDn,
0xC5CC1D89724FA456n,0x5648F680F11A2741n,0x2D255069F0B7DAB3n,0x9BC5A38EF729ABD4n,
0xEF2F054308F6A2BCn,0xAF2042F5CC5C2858n,0x480412BAB7F5BE2An,0xAEF3AF4A563DFE43n,
0x19AFE59AE451497Fn,0x52593803DFF1E840n,0xF4F076E65F2CE6F0n,0x11379625747D5AF3n,
0xBCE5D2248682C115n,0x9DA4243DE836994Fn,0x066F70B33FE09017n,0x4DC4DE189B671A1Cn,
0x51039AB7712457C3n,0xC07A3F80C31FB4B4n,0xB46EE9C5E64A6E7Cn,0xB3819A42ABE61C87n,
0x21A007933A522A20n,0x2DF16F761598AA4Fn,0x763C4A1371B368FDn,0xF793C46702E086A0n,
0xD7288E012AEB8D31n,0xDE336A2A4BC1C44Bn,0x0BF692B38D079F23n,0x2C604A7A177326B3n,
0x4850E73E03EB6064n,0xCFC447F1E53C8E1Bn,0xB05CA3F564268D99n,0x9AE182C8BC9474E8n,
0xA4FC4BD4FC5558CAn,0xE755178D58FC4E76n,0x69B97DB1A4C03DFEn,0xF9B5B7C4ACC67C96n,
0xFC6A82D64B8655FBn,0x9C684CB6C4D24417n,0x8EC97D2917456ED0n,0x6703DF9D2924E97En,
0xC547F57E42A7444En,0x78E37644E7CAD29En,0xFE9A44E9362F05FAn,0x08BD35CC38336615n,
0x9315E5EB3A129ACEn,0x94061B871E04DF75n,0xDF1D9F9D784BA010n,0x3BBA57B68871B59Dn,
0xD2B7ADEEDED1F73Fn,0xF7A255D83BC373F8n,0xD7F4F2448C0CEB81n,0xD95BE88CD210FFA7n,
0x336F52F8FF4728E7n,0xA74049DAC312AC71n,0xA2F61BB6E437FDB5n,0x4F2A5CB07F6A35B3n,
0x87D380BDA5BF7859n,0x16B9F7E06C453A21n,0x7BA2484C8A0FD54En,0xF3A678CAD9A2E38Cn,
0x39B0BF7DDE437BA2n,0xFCAF55C1BF8A4424n,0x18FCF680573FA594n,0x4C0563B89F495AC3n,
0x40E087931A00930Dn,0x8CFFA9412EB642C1n,0x68CA39053261169Fn,0x7A1EE967D27579E2n,
0x9D1D60E5076F5B6Fn,0x3810E399B6F65BA2n,0x32095B6D4AB5F9B1n,0x35CAB62109DD038An,
0xA90B24499FCFAFB1n,0x77A225A07CC2C6BDn,0x513E5E634C70E331n,0x4361C0CA3F692F12n,
0xD941ACA44B20A45Bn,0x528F7C8602C5807Bn,0x52AB92BEB9613989n,0x9D1DFA2EFC557F73n,
0x722FF175F572C348n,0x1D1260A51107FE97n,0x7A249A57EC0C9BA2n,0x04208FE9E8F7F2D6n,
0x5A110C6058B920A0n,0x0CD9A497658A5698n,0x56FD23C8F9715A4Cn,0x284C847B9D887AAEn,
0x04FEABFBBDB619CBn,0x742E1E651C60BA83n,0x9A9632E65904AD3Cn,0x881B82A13B51B9E2n,
0x506E6744CD974924n,0xB0183DB56FFC6A79n,0x0ED9B915C66ED37En,0x5E11E86D5873D484n,
0xF678647E3519AC6En,0x1B85D488D0F20CC5n,0xDAB9FE6525D89021n,0x0D151D86ADB73615n,
0xA865A54EDCC0F019n,0x93C42566AEF98FFBn,0x99E7AFEABE000731n,0x48CBFF086DDF285An,
0x7F9B6AF1EBF78BAFn,0x58627E1A149BBA21n,0x2CD16E2ABD791E33n,0xD363EFF5F0977996n,
0x0CE2A38C344A6EEDn,0x1A804AADB9CFA741n,0x907F30421D78C5DEn,0x501F65EDB3034D07n,
0x37624AE5A48FA6E9n,0x957BAF61700CFF4En,0x3A6C27934E31188An,0xD49503536ABCA345n,
0x088E049589C432E0n,0xF943AEE7FEBF21B8n,0x6C3B8E3E336139D3n,0x364F6FFA464EE52En,
0xD60F6DCEDC314222n,0x56963B0DCA418FC0n,0x16F50EDF91E513AFn,0xEF1955914B609F93n,
0x565601C0364E3228n,0xECB53939887E8175n,0xBAC7A9A18531294Bn,0xB344C470397BBA52n,
0x65D34954DAF3CEBDn,0xB4B81B3FA97511E2n,0xB422061193D6F6A7n,0x071582401C38434Dn,
0x7A13F18BBEDC4FF5n,0xBC4097B116C524D2n,0x59B97885E2F2EA28n,0x99170A5DC3115544n,
0x6F423357E7C6A9F9n,0x325928EE6E6F8794n,0xD0E4366228B03343n,0x565C31F7DE89EA27n,
0x30F5611484119414n,0xD873DB391292ED4Fn,0x7BD94E1D8E17DEBCn,0xC7D9F16864A76E94n,
0x947AE053EE56E63Cn,0xC8C93882F9475F5Fn,0x3A9BF55BA91F81CAn,0xD9A11FBB3D9808E4n,
0x0FD22063EDC29FCAn,0xB3F256D8ACA0B0B9n,0xB03031A8B4516E84n,0x35DD37D5871448AFn,
0xE9F6082B05542E4En,0xEBFAFA33D7254B59n,0x9255ABB50D532280n,0xB9AB4CE57F2D34F3n,
0x693501D628297551n,0xC62C58F97DD949BFn,0xCD454F8F19C5126An,0xBBE83F4ECC2BDECBn,
0xDC842B7E2819E230n,0xBA89142E007503B8n,0xA3BC941D0A5061CBn,0xE9F6760E32CD8021n,
0x09C7E552BC76492Fn,0x852F54934DA55CC9n,0x8107FCCF064FCF56n,0x098954D51FFF6580n,
0x23B70EDB1955C4BFn,0xC330DE426430F69Dn,0x4715ED43E8A45C0An,0xA8D7E4DAB780A08Dn,
0x0572B974F03CE0BBn,0xB57D2E985E1419C7n,0xE8D9ECBE2CF3D73Fn,0x2FE4B17170E59750n,
0x11317BA87905E790n,0x7FBF21EC8A1F45ECn,0x1725CABFCB045B00n,0x964E915CD5E2B207n,
0x3E2B8BCBF016D66Dn,0xBE7444E39328A0ACn,0xF85B2B4FBCDE44B7n,0x49353FEA39BA63B1n,
0x1DD01AAFCD53486An,0x1FCA8A92FD719F85n,0xFC7C95D827357AFAn,0x18A6A990C8B35EBDn,
0xCCCB7005C6B9C28Dn,0x3BDBB92C43B17F26n,0xAA70B5B4F89695A2n,0xE94C39A54A98307Fn,
0xB7A0B174CFF6F36En,0xD4DBA84729AF48ADn,0x2E18BC1AD9704A68n,0x2DE0966DAF2F8B1Cn,
0xB9C11D5B1E43A07En,0x64972D68DEE33360n,0x94628D38D0C20584n,0xDBC0D2B6AB90A559n,
0xD2733C4335C6A72Fn,0x7E75D99D94A70F4Dn,0x6CED1983376FA72Bn,0x97FCAACBF030BC24n,
0x7B77497B32503B12n,0x8547EDDFB81CCB94n,0x79999CDFF70902CBn,0xCFFE1939438E9B24n,
0x829626E3892D95D7n,0x92FAE24291F2B3F1n,0x63E22C147B9C3403n,0xC678B6D860284A1Cn,
0x5873888850659AE7n,0x0981DCD296A8736Dn,0x9F65789A6509A440n,0x9FF38FED72E9052Fn,
0xE479EE5B9930578Cn,0xE7F28ECD2D49EECDn,0x56C074A581EA17FEn,0x5544F7D774B14AEFn,
0x7B3F0195FC6F290Fn,0x12153635B2C0CF57n,0x7F5126DBBA5E0CA7n,0x7A76956C3EAFB413n,
0x3D5774A11D31AB39n,0x8A1B083821F40CB4n,0x7B4A38E32537DF62n,0x950113646D1D6E03n,
0x4DA8979A0041E8A9n,0x3BC36E078F7515D7n,0x5D0A12F27AD310D1n,0x7F9D1A2E1EBE1327n,
0xDA3A361B1C5157B1n,0xDCDD7D20903D0C25n,0x36833336D068F707n,0xCE68341F79893389n,
0xAB9090168DD05F34n,0x43954B3252DC25E5n,0xB438C2B67F98E5E9n,0x10DCD78E3851A492n,
0xDBC27AB5447822BFn,0x9B3CDB65F82CA382n,0xB67B7896167B4C84n,0xBFCED1B0048EAC50n,
0xA9119B60369FFEBDn,0x1FFF7AC80904BF45n,0xAC12FB171817EEE7n,0xAF08DA9177DDA93Dn,
0x1B0CAB936E65C744n,0xB559EB1D04E5E932n,0xC37B45B3F8D6F2BAn,0xC3A9DC228CAAC9E9n,
0xF3B8B6675A6507FFn,0x9FC477DE4ED681DAn,0x67378D8ECCEF96CBn,0x6DD856D94D259236n,
0xA319CE15B0B4DB31n,0x073973751F12DD5En,0x8A8E849EB32781A5n,0xE1925C71285279F5n,
0x74C04BF1790C0EFEn,0x4DDA48153C94938An,0x9D266D6A1CC0542Cn,0x7440FB816508C4FEn,
0x13328503DF48229Fn,0xD6BF7BAEE43CAC40n,0x4838D65F6EF6748Fn,0x1E152328F3318DEAn,
0x8F8419A348F296BFn,0x72C8834A5957B511n,0xD7A023A73260B45Cn,0x94EBC8ABCFB56DAEn,
0x9FC10D0F989993E0n,0xDE68A2355B93CAE6n,0xA44CFE79AE538BBEn,0x9D1D84FCCE371425n,
0x51D2B1AB2DDFB636n,0x2FD7E4B9E72CD38Cn,0x65CA5B96B7552210n,0xDD69A0D8AB3B546Dn,
0x604D51B25FBF70E2n,0x73AA8A564FB7AC9En,0x1A8C1E992B941148n,0xAAC40A2703D9BEA0n,
0x764DBEAE7FA4F3A6n,0x1E99B96E70A9BE8Bn,0x2C5E9DEB57EF4743n,0x3A938FEE32D29981n,
0x26E6DB8FFDF5ADFEn,0x469356C504EC9F9Dn,0xC8763C5B08D1908Cn,0x3F6C6AF859D80055n,
0x7F7CC39420A3A545n,0x9BFB227EBDF4C5CEn,0x89039D79D6FC5C5Cn,0x8FE88B57305E2AB6n,
0xA09E8C8C35AB96DEn,0xFA7E393983325753n,0xD6B6D0ECC617C699n,0xDFEA21EA9E7557E3n,
0xB67C1FA481680AF8n,0xCA1E3785A9E724E5n,0x1CFC8BED0D681639n,0xD18D8549D140CAEAn,
0x4ED0FE7E9DC91335n,0xE4DBF0634473F5D2n,0x1761F93A44D5AEFEn,0x53898E4C3910DA55n,
0x734DE8181F6EC39An,0x2680B122BAA28D97n,0x298AF231C85BAFABn,0x7983EED3740847D5n,
0x66C1A2A1A60CD889n,0x9E17E49642A3E4C1n,0xEDB454E7BADC0805n,0x50B704CAB602C329n,
0x4CC317FB9CDDD023n,0x66B4835D9EAFEA22n,0x219B97E26FFC81BDn,0x261E4E4C0A333A9Dn,
0x1FE2CCA76517DB90n,0xD7504DFA8816EDBBn,0xB9571FA04DC089C8n,0x1DDC0325259B27DEn,
0xCF3F4688801EB9AAn,0xF4F5D05C10CAB243n,0x38B6525C21A42B0En,0x36F60E2BA4FA6800n,
0xEB3593803173E0CEn,0x9C4CD6257C5A3603n,0xAF0C317D32ADAA8An,0x258E5A80C7204C4Bn,
0x8B889D624D44885Dn,0xF4D14597E660F855n,0xD4347F66EC8941C3n,0xE699ED85B0DFB40Dn,
0x2472F6207C2D0484n,0xC2A1E7B5B459AEB5n,0xAB4F6451CC1D45ECn,0x63767572AE3D6174n,
0xA59E0BD101731A28n,0x116D0016CB948F09n,0x2CF9C8CA052F6E9Fn,0x0B090A7560A968E3n,
0xABEEDDB2DDE06FF1n,0x58EFC10B06A2068Dn,0xC6E57A78FBD986E0n,0x2EAB8CA63CE802D7n,
0x14A195640116F336n,0x7C0828DD624EC390n,0xD74BBE77E6116AC7n,0x804456AF10F5FB53n,
0xEBE9EA2ADF4321C7n,0x03219A39EE587A30n,0x49787FEF17AF9924n,0xA1E9300CD8520548n,
0x5B45E522E4B1B4EFn,0xB49C3B3995091A36n,0xD4490AD526F14431n,0x12A8F216AF9418C2n,
0x001F837CC7350524n,0x1877B51E57A764D5n,0xA2853B80F17F58EEn,0x993E1DE72D36D310n,
0xB3598080CE64A656n,0x252F59CF0D9F04BBn,0xD23C8E176D113600n,0x1BDA0492E7E4586En,
0x21E0BD5026C619BFn,0x3B097ADAF088F94En,0x8D14DEDB30BE846En,0xF95CFFA23AF5F6F4n,
0x3871700761B3F743n,0xCA672B91E9E4FA16n,0x64C8E531BFF53B55n,0x241260ED4AD1E87Dn,
0x106C09B972D2E822n,0x7FBA195410E5CA30n,0x7884D9BC6CB569D8n,0x0647DFEDCD894A29n,
0x63573FF03E224774n,0x4FC8E9560F91B123n,0x1DB956E450275779n,0xB8D91274B9E9D4FBn,
0xA2EBEE47E2FBFCE1n,0xD9F1F30CCD97FB09n,0xEFED53D75FD64E6Bn,0x2E6D02C36017F67Fn,
0xA9AA4D20DB084E9Bn,0xB64BE8D8B25396C1n,0x70CB6AF7C2D5BCF0n,0x98F076A4F7A2322En,
0xBF84470805E69B5Fn,0x94C3251F06F90CF3n,0x3E003E616A6591E9n,0xB925A6CD0421AFF3n,
0x61BDD1307C66E300n,0xBF8D5108E27E0D48n,0x240AB57A8B888B20n,0xFC87614BAF287E07n,
0xEF02CDD06FFDB432n,0xA1082C0466DF6C0An,0x8215E577001332C8n,0xD39BB9C3A48DB6CFn,
0x2738259634305C14n,0x61CF4F94C97DF93Dn,0x1B6BACA2AE4E125Bn,0x758F450C88572E0Bn,
0x959F587D507A8359n,0xB063E962E045F54Dn,0x60E8ED72C0DFF5D1n,0x7B64978555326F9Fn,
0xFD080D236DA814BAn,0x8C90FD9B083F4558n,0x106F72FE81E2C590n,0x7976033A39F7D952n,
0xA4EC0132764CA04Bn,0x733EA705FAE4FA77n,0xB4D8F77BC3E56167n,0x9E21F4F903B33FD9n,
0x9D765E419FB69F6Dn,0xD30C088BA61EA5EFn,0x5D94337FBFAF7F5Bn,0x1A4E4822EB4D7A59n,
0x6FFE73E81B637FB3n,0xDDF957BC36D8B9CAn,0x64D0E29EEA8838B3n,0x08DD9BDFD96B9F63n,
0x087E79E5A57D1D13n,0xE328E230E3E2B3FBn,0x1C2559E30F0946BEn,0x720BF5F26F4D2EAAn,
0xB0774D261CC609DBn,0x443F64EC5A371195n,0x4112CF68649A260En,0xD813F2FAB7F5C5CAn,
0x660D3257380841EEn,0x59AC2C7873F910A3n,0xE846963877671A17n,0x93B633ABFA3469F8n,
0xC0C0F5A60EF4CDCFn,0xCAF21ECD4377B28Cn,0x57277707199B8175n,0x506C11B9D90E8B1Dn,
0xD83CC2687A19255Fn,0x4A29C6465A314CD1n,0xED2DF21216235097n,0xB5635C95FF7296E2n,
0x22AF003AB672E811n,0x52E762596BF68235n,0x9AEBA33AC6ECC6B0n,0x944F6DE09134DFB6n,
0x6C47BEC883A7DE39n,0x6AD047C430A12104n,0xA5B1CFDBA0AB4067n,0x7C45D833AFF07862n,
0x5092EF950A16DA0Bn,0x9338E69C052B8E7Bn,0x455A4B4CFE30E3F5n,0x6B02E63195AD0CF8n,
0x6B17B224BAD6BF27n,0xD1E0CCD25BB9C169n,0xDE0C89A556B9AE70n,0x50065E535A213CF6n,
0x9C1169FA2777B874n,0x78EDEFD694AF1EEDn,0x6DC93D9526A50E68n,0xEE97F453F06791EDn,
0x32AB0EDB696703D3n,0x3A6853C7E70757A7n,0x31865CED6120F37Dn,0x67FEF95D92607890n,
0x1F2B1D1F15F6DC9Cn,0xB69E38A8965C6B65n,0xAA9119FF184CCCF4n,0xF43C732873F24C13n,
0xFB4A3D794A9A80D2n,0x3550C2321FD6109Cn,0x371F77E76BB8417En,0x6BFA9AAE5EC05779n,
0xCD04F3FF001A4778n,0xE3273522064480CAn,0x9F91508BFFCFC14An,0x049A7F41061A9E60n,
0xFCB6BE43A9F2FE9Bn,0x08DE8A1C7797DA9Bn,0x8F9887E6078735A1n,0xB5B4071DBFC73A66n,
0x230E343DFBA08D33n,0x43ED7F5A0FAE657Dn,0x3A88A0FBBCB05C63n,0x21874B8B4D2DBC4Fn,
0x1BDEA12E35F6A8C9n,0x53C065C6C8E63528n,0xE34A1D250E7A8D6Bn,0xD6B04D3B7651DD7En,
0x5E90277E7CB39E2Dn,0x2C046F22062DC67Dn,0xB10BB459132D0A26n,0x3FA9DDFB67E2F199n,
0x0E09B88E1914F7AFn,0x10E8B35AF3EEAB37n,0x9EEDECA8E272B933n,0xD4C718BC4AE8AE5Fn,
0x81536D601170FC20n,0x91B534F885818A06n,0xEC8177F83F900978n,0x190E714FADA5156En,
0xB592BF39B0364963n,0x89C350C893AE7DC1n,0xAC042E70F8B383F2n,0xB49B52E587A1EE60n,
0xFB152FE3FF26DA89n,0x3E666E6F69AE2C15n,0x3B544EBE544C19F9n,0xE805A1E290CF2456n,
0x24B33C9D7ED25117n,0xE74733427B72F0C1n,0x0A804D18B7097475n,0x57E3306D881EDB4Fn,
0x4AE7D6A36EB5DBCBn,0x2D8D5432157064C8n,0xD1E649DE1E7F268Bn,0x8A328A1CEDFE552Cn,
0x07A3AEC79624C7DAn,0x84547DDC3E203C94n,0x990A98FD5071D263n,0x1A4FF12616EEFC89n,
0xF6F7FD1431714200n,0x30C05B1BA332F41Cn,0x8D2636B81555A786n,0x46C9FEB55D120902n,
0xCCEC0A73B49C9921n,0x4E9D2827355FC492n,0x19EBB029435DCB0Fn,0x4659D2B743848A2Cn,
0x963EF2C96B33BE31n,0x74F85198B05A2E7Dn,0x5A0F544DD2B1FB18n,0x03727073C2E134B1n,
0xC7F6AA2DE59AEA61n,0x352787BAA0D7C22Fn,0x9853EAB63B5E0B35n,0xABBDCDD7ED5C0860n,
0xCF05DAF5AC8D77B0n,0x49CAD48CEBF4A71En,0x7A4C10EC2158C4A6n,0xD9E92AA246BF719En,
0x13AE978D09FE5557n,0x730499AF921549FFn,0x4E4B705B92903BA4n,0xFF577222C14F0A3An,
0x55B6344CF97AAFAEn,0xB862225B055B6960n,0xCAC09AFBDDD2CDB4n,0xDAF8E9829FE96B5Fn,
0xB5FDFC5D3132C498n,0x310CB380DB6F7503n,0xE87FBB46217A360En,0x2102AE466EBB1148n,
0xF8549E1A3AA5E00Dn,0x07A69AFDCC42261An,0xC4C118BFE78FEAAEn,0xF9F4892ED96BD438n,
0x1AF3DBE25D8F45DAn,0xF5B4B0B0D2DEEEB4n,0x962ACEEFA82E1C84n,0x046E3ECAAF453CE9n,
0xF05D129681949A4Cn,0x964781CE734B3C84n,0x9C2ED44081CE5FBDn,0x522E23F3925E319En,
0x177E00F9FC32F791n,0x2BC60A63A6F3B3F2n,0x222BBFAE61725606n,0x486289DDCC3D6780n,
0x7DC7785B8EFDFC80n,0x8AF38731C02BA980n,0x1FAB64EA29A2DDF7n,0xE4D9429322CD065An,
0x9DA058C67844F20Cn,0x24C0E332B70019B0n,0x233003B5A6CFE6ADn,0xD586BD01C5C217F6n,
0x5E5637885F29BC2Bn,0x7EBA726D8C94094Bn,0x0A56A5F0BFE39272n,0xD79476A84EE20D06n,
0x9E4C1269BAA4BF37n,0x17EFEE45B0DEE640n,0x1D95B0A5FCF90BC6n,0x93CBE0B699C2585Dn,
0x65FA4F227A2B6D79n,0xD5F9E858292504D5n,0xC2B5A03F71471A6Fn,0x59300222B4561E00n,
0xCE2F8642CA0712DCn,0x7CA9723FBB2E8988n,0x2785338347F2BA08n,0xC61BB3A141E50E8Cn,
0x150F361DAB9DEC26n,0x9F6A419D382595F4n,0x64A53DC924FE7AC9n,0x142DE49FFF7A7C3Dn,
0x0C335248857FA9E7n,0x0A9C32D5EAE45305n,0xE6C42178C4BBB92En,0x71F1CE2490D20B07n,
0xF1BCC3D275AFE51An,0xE728E8C83C334074n,0x96FBF83A12884624n,0x81A1549FD6573DA5n,
0x5FA7867CAF35E149n,0x56986E2EF3ED091Bn,0x917F1DD5F8886C61n,0xD20D8C88C8FFE65Fn,
0x31D71DCE64B2C310n,0xF165B587DF898190n,0xA57E6339DD2CF3A0n,0x1EF6E6DBB1961EC9n,
0x70CC73D90BC26E24n,0xE21A6B35DF0C3AD7n,0x003A93D8B2806962n,0x1C99DED33CB890A1n,
0xCF3145DE0ADD4289n,0xD0E4427A5514FB72n,0x77C621CC9FB3A483n,0x67A34DAC4356550Bn,
0xF8D626AAAF278509n
];

const PIECE_KIND = { p:0, P:1, n:2, N:3, b:4, B:5, r:6, R:7, q:8, Q:9, k:10, K:11 };

function fenToBoard(placement) {
  const ranks = placement.split('/');
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let r = 0; r < 8; r++) {
    const row = 7 - r;
    let file = 0;
    for (const ch of ranks[r]) {
      if (/\d/.test(ch)) { file += parseInt(ch, 10); continue; }
      board[row][file] = ch;
      file++;
    }
  }
  return board;
}

function polyglotKey(fen) {
  const [placement, activeColor, castling, epSquare] = fen.trim().split(/\s+/);
  let key = 0n;

  const ranks = placement.split('/');
  for (let r = 0; r < 8; r++) {
    const row = 7 - r;
    let file = 0;
    for (const ch of ranks[r]) {
      if (/\d/.test(ch)) { file += parseInt(ch, 10); continue; }
      const kind = PIECE_KIND[ch];
      key ^= RANDOM64[64 * kind + 8 * row + file];
      file++;
    }
  }

  if (castling && castling !== '-') {
    if (castling.includes('K')) key ^= RANDOM64[768];
    if (castling.includes('Q')) key ^= RANDOM64[769];
    if (castling.includes('k')) key ^= RANDOM64[770];
    if (castling.includes('q')) key ^= RANDOM64[771];
  }

  if (epSquare && epSquare !== '-') {
    const epFile = epSquare.charCodeAt(0) - 97;
    const whiteToMove = activeColor === 'w';
    const captureRow = whiteToMove ? 4 : 3;
    const pawnChar = whiteToMove ? 'P' : 'p';
    const board = fenToBoard(placement);
    let canCapture = false;
    for (const df of [-1, 1]) {
      const f = epFile + df;
      if (f < 0 || f > 7) continue;
      if (board[captureRow][f] === pawnChar) { canCapture = true; break; }
    }
    if (canCapture) key ^= RANDOM64[772 + epFile];
  }

  if (activeColor === 'w') key ^= RANDOM64[780];

  return key;
}

function squareName(file, row) {
  return String.fromCharCode(97 + file) + (row + 1);
}

function decodeMove(moveBits) {
  const toFile = moveBits & 0x7;
  const toRow = (moveBits >> 3) & 0x7;
  const fromFile = (moveBits >> 6) & 0x7;
  const fromRow = (moveBits >> 9) & 0x7;
  const promoBits = (moveBits >> 12) & 0x7;
  const promoMap = { 0: null, 1: 'n', 2: 'b', 3: 'r', 4: 'q' };
  return {
    from: squareName(fromFile, fromRow),
    to: squareName(toFile, toRow),
    promotion: promoMap[promoBits]
  };
}

// Cache le buffer du book en mémoire pour éviter de refetch à chaque appel
let _bookBufferPromise = null;
function loadBookBuffer() {
  if (!_bookBufferPromise) {
    const url = chrome.runtime.getURL('book/book.bin');
    _bookBufferPromise = fetch(url).then(r => {
      if (!r.ok) throw new Error('book.bin introuvable: ' + r.status);
      return r.arrayBuffer();
    });
  }
  return _bookBufferPromise;
}


async function getBookMoves(fen, side) {

  const buf = await loadBookBuffer();
  const view = new DataView(buf);
  const entryCount = buf.byteLength / 16;
  const targetKey = polyglotKey(fen);

  const readKey = (i) => {
    const hi = view.getUint32(i * 16, false);
    const lo = view.getUint32(i * 16 + 4, false);
    return (BigInt(hi) << 32n) | BigInt(lo);
  };

  let lo = 0, hi = entryCount - 1, first = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const k = readKey(mid);
    if (k === targetKey) { first = mid; hi = mid - 1; }
    else if (k < targetKey) lo = mid + 1;
    else hi = mid - 1;
  }

  const moves = [];
  if (first !== -1) {
    for (let i = first; i < entryCount; i++) {
      if (readKey(i) !== targetKey) break;
      const moveBits = view.getUint16(i * 16 + 8, false);
      if (moveBits === 0) continue;
      const { from, to } = decodeMove(moveBits);
      moves.push({ from, to, eval: "book", fen, side });
    }
  }
  return moves;
}

async function loadWorkerScript(path) {
  const url = chrome.runtime.getURL(path);
  const res = await fetch(url);
  const code = await res.text();
  const patched = code.replaceAll(
    'const EXTENSION_ID = "chesshV3ID"',
    `const EXTENSION_ID = "${chrome.runtime.id}"`,
  );

  return patched;
}

async function createWorkerStockfish6() {
  const code = await loadWorkerScript("lib/stockfish6.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

async function createWorkerStockfish11() {
  const code = await loadWorkerScript("lib/stockfish11.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

// create webworker for komodo
async function createWorkerKomodo() {
  const code = await loadWorkerScript("lib/komodo.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

// create webworker for torch (coach)
async function createWorkerTorch() {
  const code = await loadWorkerScript("lib/torch.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

// Komodo instance
class komodo {
  constructor({
    elo = config.elo,
    depth = config.depth,
    multipv = config.lines,
    threads = 2,
    hash = 128,
    personality = config.style,
  }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.personality = personality;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorkerKomodo();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
  quit() {
    this.hardStop();
    this.worker.postMessage("quit");
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorkerKomodo();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage("setoption name UCI LimitStrength value true");
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);
  }

  updateConfig(lines, depth, style, elo) {
    this.depth = depth;
    this.elo = elo;
    this.personality = style;
    this.multipv = lines;
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);
  }

  async getMovesByFen(fen, side) {
    // this.worker.postMessage(`setoption name Auto Skill value true`);

    const booksMove = await getBookMoves(fen, side)
    console.clear()
    console.log(booksMove)

    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage(`setoption name UCI Elo value ${config.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        
        //console.log(line);
        if (typeof line !== "string") return;

        if (line.startsWith("bestmove")) {
          const parts = line.split(" ");

          if (line.split("ponder")[1] === " ") {
            const from = line.split(" ")[1].slice(0, 2);
            const to = line.split(" ")[1].slice(2);
            results.push({
              from: from,
              to: to,
              eval: "book",
              fen: fen,
              side: side,
            });

            this.worker.removeEventListener("message", onMessage);
            resolve(results);
            return;
          }
        }

        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > config.lines) continue;

            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen: fen,
                  side: side,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`stop`);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

class CoachEngine {
  constructor() {
    this.worker = null;
    this.ready = this.init();

    // Garde en mémoire la promesse du calcul en cours et un ID unique
    this.currentRequestId = 0;
    this.activeReject = null;
  }

  async init() {
    this.worker = await createWorkerTorch();
    this.setup();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorkerTorch();
    this.setup();
  }

  send(cmd) {
    if (this.worker) {
      this.worker.postMessage(cmd);
    }
  }

  setup() {
    this.send("setoption name UseDeclarativePositionCommand value true");
    this.send("setoption name BlackElo value 3200");
    this.send("setoption name WhiteElo value 3200");
    this.send("setoption name HandleContinuations value true");
    this.send(`setoption name HandleContinuationsDepth value ${config.depth2}`);
    this.send("setoption name UserColor value white");
    this.send("setoption name BotChatPrioritizePlayerMove value true");
    this.send("setoption name SerializeSpeechDetails value true");
    this.send("setoption name AllowBoardEventsWithoutSpeech value true");
    this.send("setoption name ServeCommandV2 value true");
    this.send("setoption name SpeechV3 value true");
    this.send("setoption name ClassificationV3 value true");
    this.send("setoption name UCI_Chess960 value false");
    this.send("setoption name UseRatingRanges value true");
    this.send(`setoption name Language value ${coachs[config.coach].lang}`);
    this.send(coachs[config.coach].cmd);
    this.send(`setoption name Language value ${coachs[config.coach].lang}`);
  }

  async getChat(movesString, side = "white", whiteElo = 3200, blackElo = 3200) {
    if (config.coach === 999) return null;

    await this.ready;
    if (!this.worker) throw new Error("Engine non initialisé");

    const requestId = ++this.currentRequestId;

    if (this.activeReject) {
      this.activeReject(new Error("CANCELLED"));
      this.activeReject = null;
    }

    return new Promise((resolve, reject) => {
      this.activeReject = reject;

      const onMessage = (e) => {
        if (requestId !== this.currentRequestId) {
          this.worker.removeEventListener("message", onMessage);
          return;
        }

        let raw = e.data;
        let cleanRaw = raw;

        // console.log(raw)

        if (typeof cleanRaw === "string" && cleanRaw.startsWith("json ")) {
          cleanRaw = cleanRaw.slice(5).trim();
        } else {
          if (cleanRaw.includes("ABORT")) {
            console.warn("Analyse interrompue par le worker");
          }
        }

        try {
          const data = JSON.parse(cleanRaw);
          // console.clear()
          // console.log(data)

          const last = data?.positions?.[data.positions.length - 1];
          const _fen = last?.fen;

          if (!last) return;

          const whiteAccuracy = data?.CAPS?.white?.all;
          const blackAccuracy = data?.CAPS?.black?.all;
          const blackEloRes = data?.reportCard?.black?.effectiveElo;
          const whiteEloRes = data?.reportCard?.white?.effectiveElo;

          // Mise à jour des variables globales si nécessaire
          if (typeof stat_0_white !== "undefined")
            stat_0_white = data?.tallies?.white;
          if (typeof stat_0_black !== "undefined")
            stat_0_black = data?.tallies?.black;

          const classificationName = last.classificationName;
          const fen = last.fen;
          const audioUrlHash = last?.playedMove?.speech?.[0]?.audioUrlHash;
          const moveLan = last?.playedMove?.moveLan;

          let show_ = false;
          const bestMove = last?.bestMove?.moveLan || "";
          const bestMove_classification = last?.bestMove?.classification;

          if (side !== last?.color) {
            show_ = true;
          }

          const res_data = {
            from: bestMove.slice(0, 2),
            to: bestMove.slice(2, 4),
            classification: bestMove_classification,
            show: show_,
            fen: _fen,
            info: {
              tags: last?.bestMove?.insightsTags,
              mateIn: last?.bestMove?.mateIn,
              pv: last?.bestMove?.eval?.pv,
            },
          };

          // console.log(res_data)

          if (!audioUrlHash) return;

          const urlAudio = `${coachs[config.coach].link}${audioUrlHash}.mp3`;

          this.worker.removeEventListener("message", onMessage);
          this.activeReject = null;

          resolve({
            classificationName,
            fen,
            urlAudio,
            moveLan,
            whiteAccuracy,
            whiteElo: whiteEloRes,
            blackAccuracy,
            blackElo: blackEloRes,
            res_data,
          });
        } catch (err) {
          // Ignorer les messages non-JSON émis pendant les étapes intermédiaires du worker
        }
      };

      this.worker.addEventListener("message", onMessage);

      // 3. Envoyer la commande Stop pour arrêter l'analyse précédente dans le Worker avant de relancer
      this.send("stop");

      // 4. Mettre à jour la configuration et demander la nouvelle analyse
      this.send(`setoption name UserColor value ${side}`);
      this.send(
        `setoption name HandleContinuationsDepth value ${config.depth2}`,
      );
      this.send(`setoption name BlackElo value ${blackElo}`);
      this.send(`setoption name WhiteElo value ${whiteElo}`);

      this.send(movesString);
      this.send("fetch analysis");
    }).catch((err) => {
      if (err.message === "CANCELLED") {
        return null; // Annulation silencieuse lorsqu'un coup plus récent est joué
      }
      throw err;
    });
  }
}

class Stockfish6 {
  constructor() {
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorkerStockfish6();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    // this.worker.postMessage(
    //   `setoption name Mobility (Midgame) value ${this.mobilityMid}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Mobility (Endgame) value ${this.mobilityEnd}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Pawn Structure (Midgame) value ${this.pawnStructureMid}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Pawn Structure (Endgame) value ${this.pawnStructureEnd}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Passed Pawns (Midgame) value ${this.passedPawnsMid}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Passed Pawns (Endgame) value ${this.passedPawnsEnd}`,
    // );
    // this.worker.postMessage(
    //   `setoption name King Safety value ${this.kingSafety}`,
    // );
    // this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  updateConfig(cfg = {}) {
    Object.assign(this, cfg);
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  quit() {
    this.hardStop();
    this.worker?.postMessage("quit");
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorkerStockfish6();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  async getMovesByFen(fen, side) {
    await this.ready;

    this.worker.postMessage(
      `setoption name Mobility (Midgame) value ${config.st6_mobilityMid}`,
    );
    this.worker.postMessage(
      `setoption name Mobility (Endgame) value ${config.st6_mobilityEnd}`,
    );

    this.worker.postMessage(
      `setoption name Pawn Structure (Midgame) value ${config.st6_pawnStructureMid}`,
    );
    this.worker.postMessage(
      `setoption name Pawn Structure (Endgame) value ${config.st6_pawnStructureEnd}`,
    );

    this.worker.postMessage(
      `setoption name Passed Pawns (Midgame) value ${config.st6_passedPawnsMid}`,
    );
    this.worker.postMessage(
      `setoption name Passed Pawns (Endgame) value ${config.st6_passedPawnsEnd}`,
    );

    this.worker.postMessage(
      `setoption name King Safety value ${config.st6_kingSafety}`,
    );

    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);

    const results = [];
    const infoLines = [];
    const seenMoves = new Set();
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (typeof line !== "string") return;

        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth}`)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > config.lines) continue;

            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && parts[pvIndex + 1]) {
              const move = parts[pvIndex + 1];

              if (move.length >= 4 && !seenMoves.has(move)) {
                seenMoves.add(move);

                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen,
                  side,
                });
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);

      this.worker.postMessage("stop");
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${config.depth}`);
    });
  }
}

class Stockfish11 {
  constructor() {
    this.depth = 5;
    this.multipv = 5;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorkerStockfish11();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);
    this.worker.postMessage("setoption name Ponder value false");
  }

  updateConfig({ elo, depth, multipv, threads, hash, style }) {
    if (elo !== undefined) this.elo = elo;
    if (depth !== undefined) this.depth = depth;
    if (multipv !== undefined) this.multipv = multipv;
    if (threads !== undefined) this.threads = threads;
    if (hash !== undefined) this.hash = hash;
    if (style !== undefined) this.style = style;
    this.setOptions();
  }

  async getMovesByFen(fen, side = "white") {
    await this.ready;

    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);
    this.worker.postMessage("setoption name Ponder value false");

    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const multipvResults = new Map();
      this.worker.postMessage("uci");

      const onMessage = (event) => {
        const msg = event.data;
        // console.log(msg);
        if (typeof msg !== "string") return;

        if (msg.includes(`info depth ${this.depth}`)) {
          const multipvMatch = msg.match(/multipv (\d+)/);
          const scoreMatch = msg.match(/score (cp|mate) (-?\d+)/);
          const pvMatch = msg.match(/pv ([a-h][1-8][a-h][1-8][qrbn]?)/);

          if (multipvMatch && scoreMatch && pvMatch) {
            const multipv = parseInt(multipvMatch[1], 10);
            const scoreType = scoreMatch[1];
            let scoreValueRaw = parseInt(scoreMatch[2], 10);

            if (sideToMove === "b") {
              scoreValueRaw = -scoreValueRaw;
            }

            const bestMove = pvMatch[1]; // best Move
            let score;
            if (scoreType === "cp") {
              const value = +(scoreValueRaw / 100).toFixed(2);
              score = value > 0 ? `+${value}` : `${value}`;
            } else if (scoreType === "mate") {
              score =
                scoreValueRaw > 0
                  ? `#${scoreValueRaw}`
                  : `#-${Math.abs(scoreValueRaw)}`;
            }

            const from = bestMove.slice(0, 2);
            const to = bestMove.slice(2, 4);

            multipvResults.set(multipv, {
              from,
              to,
              eval: score,
              fen: fen,
              side: side,
            });
          }
        }

        if (msg.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);
          resolve(
            Array.from(multipvResults.entries())
              .sort(([a], [b]) => a - b)
              .map(([_, val]) => val),
          );
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage("stop");
      this.worker.postMessage(`go depth ${config.depth}`);
    });
  }
}

async function createWorkerMaia3() {
  const code = await loadWorkerScript("lib/maia3/maia3-worker.js");
  const blob = new Blob([code], { type: "application/javascript" });
  return new Worker(URL.createObjectURL(blob));
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

class Maia3 {
  constructor(selfElo = 1500, oppoElo = 1500) {
    this.selfElo = selfElo;
    this.oppoElo = oppoElo;
    this.topN = 5;
    this._inferenceId = 0;
    this._resolvers = {};
    this.ready = this.init();
  }

  async init() {
    // Worker
    this.worker = await createWorkerMaia3();

    // ORT blob URL
    const ortResp = await fetch(chrome.runtime.getURL("lib/ort/ort.min.js"));
    const ortText = await ortResp.text();
    const ortBlob = new Blob([ortText], { type: "application/javascript" });
    const ortRuntimeUrl = URL.createObjectURL(ortBlob);

    // all_moves cache
    const r = await fetch(chrome.runtime.getURL("lib/maia3/all_moves.json"));
    this._allMoves = await r.json();
    this._allMovesDict = {};
    this._allMoves.forEach((m, i) => (this._allMovesDict[m] = i));

    // Message handler permanent
    this.worker.addEventListener("message", (e) => {
      const msg = e.data;

      if (msg.type === "inference-result") {
        const resolve = this._resolvers[msg.id];
        if (resolve) {
          resolve(new Float32Array(msg.logitsMove));
          delete this._resolvers[msg.id];
        }
      }

      if (msg.type === "error" && msg.id != null) {
        const resolve = this._resolvers[msg.id];
        if (resolve) {
          resolve(null);
          delete this._resolvers[msg.id];
        }
      }
    });

    // Init worker engine
    await new Promise((resolve, reject) => {
      const onMsg = (e) => {
        if (e.data.type === "status" && e.data.status === "ready") {
          this.worker.removeEventListener("message", onMsg);
          resolve();
        }
        if (e.data.type === "error" && e.data.id == null) {
          this.worker.removeEventListener("message", onMsg);
          reject(new Error(e.data.message));
        }
      };
      this.worker.addEventListener("message", onMsg);

      this.worker.postMessage({
        type: "init",
        modelUrl: chrome.runtime.getURL("lib/maia3/maia3-5m.onnx"),
        ortBaseUrl: chrome.runtime.getURL("lib/ort/"),
        ortRuntimeUrl: ortRuntimeUrl,
      });
    });
  }

  async getMovesByFen(fen) {
    await this.ready;

    const turn = fen.split(" ")[1];

    // Tokenize
    const boardTokens = tokenizeBoard(fen);
    const tokenFlat = getHistoricalTokens([boardTokens], {
      history: 8,
      include_time_info: false,
    });

    // Inference
    const id = ++this._inferenceId;
    const buf = tokenFlat.buffer.slice(0);

    const logits = await new Promise((resolve) => {
      this._resolvers[id] = resolve;
      this.worker.postMessage(
        {
          type: "inference",
          id,
          tokens: buf,
          eloSelfs: [config.elo],
          eloOppos: [config.elo],
          batchSize: 1,
        },
        [buf],
      );
    });

    if (!logits) throw new Error("Inference échouée");

    // Mask + softmax
    const mask = getLegalMovesMask(fen, this._allMovesDict, turn);
    const masked = new Float32Array(4352);
    for (let i = 0; i < 4352; i++) masked[i] = mask[i] ? logits[i] : -Infinity;

    const finiteVals = masked.filter((v) => isFinite(v));
    const maxL = Math.max(...finiteVals);
    let expSum = 0;
    const probs = new Float32Array(4352);
    for (let i = 0; i < 4352; i++) {
      if (mask[i]) {
        probs[i] = Math.exp(masked[i] - maxL);
        expSum += probs[i];
      }
    }
    for (let i = 0; i < 4352; i++) probs[i] /= expSum;

    const indexed = [];
    for (let i = 0; i < 4352; i++) {
      if (mask[i]) indexed.push({ idx: i, prob: probs[i] });
    }
    indexed.sort((a, b) => b.prob - a.prob);

    return indexed.slice(0, config.lines).map(({ idx, prob }, rank) => {
      const uci = indexToUci(idx, this._allMoves, turn);
      const from = uci.slice(0, 2);
      const to = uci.slice(2, 4);
      return {
        from,
        to,
        eval: ordinal(rank + 1),
        fen,
        rank: rank + 1,
      };
    });
  }
}

class Lozza {
  constructor() {
    this.ready = this.init();
  }

  async init() {
    await this.createWorker();
  }

  async createWorker() {
    if (this.worker) this.worker.terminate();
    const url = chrome.runtime.getURL("lib/lozza.js");
    const blob = new Blob([`importScripts("${url}");`], {
      type: "application/javascript",
    });
    const blobUrl = URL.createObjectURL(blob);
    this.worker = new Worker(blobUrl);
    URL.revokeObjectURL(blobUrl);
  }

  stop() {
    if (this.worker) this.worker.terminate();
  }

  async getMovesByFen(fen, side) {
    await this.ready;
    await this.createWorker();

    return new Promise((resolve) => {
      const onMessage = (e) => {
        const msg = e.data;
        if (
          typeof msg === "string" &&
          msg.toLowerCase().startsWith("bestmove")
        ) {
          this.worker.removeEventListener("message", onMessage);
          const moveParts = msg.split(" ")[1];
          resolve([
            {
              from: moveParts.slice(0, 2),
              to: moveParts.slice(2, 4),
              eval: "1st",
              fen: fen,
              side: side,
            },
          ]);
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${config.depth}`);
    });
  }
}

class Wukong {
  constructor() {
    this.ready = this.init();
  }

  async init() {
    await this.createWorker();
  }

  async createWorker() {
    if (this.worker) this.worker.terminate();
    const url = chrome.runtime.getURL("lib/wukong.js");
    const blob = new Blob([`importScripts("${url}");`], {
      type: "application/javascript",
    });
    const blobUrl = URL.createObjectURL(blob);
    this.worker = new Worker(blobUrl);
    URL.revokeObjectURL(blobUrl);
  }

  stop() {
    if (this.worker) this.worker.terminate();
  }

  async getMovesByFen(fen, side) {
    await this.ready;
    await this.createWorker();

    return new Promise((resolve) => {
      const onMessage = (e) => {
        const { type, text } = e.data;
        if (type === "log" && text.startsWith("Best move:")) {
          this.worker.removeEventListener("message", onMessage);
          resolve([
            {
              from: text.slice(11, 13),
              to: text.slice(13, 15),
              eval: "1st",
              fen: fen,
              side: side,
            },
          ]);
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage({ command: `position fen ${fen}` });
      this.worker.postMessage({ command: `go depth ${config.depth}` });
    });
  }
}
