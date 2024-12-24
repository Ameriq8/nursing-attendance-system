"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var predefinedStudents = [
    { name: 'يوسف سامر محمد حبيب', id: '23110021062' },
    { name: 'هاشم احمد هاشم سعود', id: '23110021061' },
    { name: 'نور الزهراء ضياء عبد الامير حسن', id: '23110021060' },
    { name: 'مهدي حافظ علي اسماعيل', id: '23110021058' },
    { name: 'مصطفى باسم محمد جبار', id: '23110021057' },
    { name: 'محسن محمد يونس علوان', id: '23110021056' },
    { name: 'فاضل عباس محمود عبد الرضا', id: '23110021055' },
    { name: 'فارس عبد الله عبد الكاظم جبير', id: '23110021054' },
    { name: 'غدير هادي ابراهيم علي', id: '23110021053' },
    { name: 'علي قحطان سلطان حلان', id: '23110021052' },
    { name: 'عامر محمد عبد الرضا عباس', id: '23110021051' },
    { name: 'طه حمزه عبيس رسن', id: '23110021050' },
    { name: 'صادق حيدر مطشر خضير', id: '23110021049' },
    { name: 'سجاد حيدر نزال ثويني', id: '23110021048' },
    { name: 'ساره علي ادريس عبد المطلب', id: '23110021047' },
    { name: 'زينة سفير نايف سلوم', id: '23110021046' },
    { name: 'زينب صباح كاظم ناجي', id: '23110021045' },
    { name: 'رسل خضر عبد الحمزه مطلب', id: '23110021044' },
    { name: 'حيدر علي نجم عبد الله', id: '23110021043' },
    { name: 'حنين كاظم جمعه فرحان', id: '23110021042' },
    { name: 'حسين علي حسن وحيد', id: '23110021041' },
    { name: 'جمانه علي محمد صابر', id: '23110021040' },
    { name: 'بركات علاء عارف حلو', id: '23110021039' },
    { name: 'بتول حيدر ادريس عبد المطلب', id: '23110021038' },
    { name: 'باقر حيدر وحودي عريبي', id: '23110021037' },
    { name: 'أنوار سالم جهاد حسون', id: '23110021036' },
    { name: 'ايه رعد عمران كاظم', id: '23110021035' },
    { name: 'ايه جهاد عبد الله طالب', id: '23110021034' },
    { name: 'ايات عبد الله كاطع', id: '23110021412' },
    { name: 'اسراء نهاد مطير رجا', id: '23110021411' },
    { name: 'احمد خالد ناجي حمزه', id: '23110021410' },
    { name: 'احمد حيدر كاظم سلطان', id: '23110021409' },
    { name: 'اثمار علي عبد هاشم', id: '23110021408' },
    { name: 'ابرار حسن خليف جاسم', id: '23110021407' },
    { name: 'ايلاف عباس قاسم كاظم', id: '23110021413' },
    { name: 'بنين صباح علي قاسم', id: '23110021414' },
    { name: 'حسناء عليوي جاسم راهي', id: '23110021415' },
    { name: 'حسنين محمد جاسم حسين', id: '23110021416' },
    { name: 'رباب باسم عبد الرزاق عزيز', id: '23110021417' },
    { name: 'رحمه رجب حميد حسن', id: '23110021418' },
    { name: 'زهراء سلمان عبدالحر حسين', id: '23110021420' },
    { name: 'زهراء عبد الامير محمد مهاوش', id: '23110021421' },
    { name: 'زهراء عبد الله رجب عبد الحسن', id: '23110021422' },
    { name: 'زينب حامد هاشم علي', id: '23110021423' },
    { name: 'سجى وسام صاحب موسى', id: '23110021424' },
    { name: 'سكينه خضر خليل محمد علي', id: '23110021425' },
    { name: 'صفا حيدر علي شكر', id: '23110021426' },
    { name: 'عبد الحسين قاسم جبر ادريس', id: '23110021427' },
    { name: 'عبد الله فائز شاكر حنون', id: '23110021428' },
    { name: 'غدير حميد عزيز محمد', id: '23110021429' },
    { name: 'محمد حامد كطان جواد', id: '23110021431' },
    { name: 'محمد حسين جهاد سلمان', id: '23110021432' },
    { name: 'محمد نعمة محمد حسين', id: '23110021433' },
    { name: 'مصطفى عماد نور بادي', id: '23110021434' },
    { name: 'مصطفى مهدي جليل مهدي', id: '23110021435' },
    { name: 'هدى حيدر نجم عبدعلي', id: '23110021436' },
    { name: 'هيام صالح شلاقه شافي', id: '23110021437' },
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, predefinedStudents_1, student;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Start seeding...');
                    _i = 0, predefinedStudents_1 = predefinedStudents;
                    _a.label = 1;
                case 1:
                    if (!(_i < predefinedStudents_1.length)) return [3 /*break*/, 4];
                    student = predefinedStudents_1[_i];
                    return [4 /*yield*/, prisma.student.upsert({
                            where: { id: student.id },
                            update: {},
                            create: {
                                id: student.id,
                                name: student.name,
                            },
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Seeding finished.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
