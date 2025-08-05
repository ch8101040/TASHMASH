import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, FileText, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { AppSettings } from '@/entities/AppSettings';
export default function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState({ showDisclaimer: false, showRequirements: true });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSettings = async () => {
        try {
            const settingsList = await AppSettings.list();
            if (settingsList.length > 0) {
                const { showDisclaimerBox, showRequirementsBox } = settingsList[0];
                setSettings({ showDisclaimer: showDisclaimerBox, showRequirements: showRequirementsBox });
            } else {
                 // If no settings exist, default to true for requirements and false for disclaimer
                 setSettings({ showDisclaimer: false, showRequirements: true });
            }
        } catch (error) {
            console.error("Failed to fetch app settings:", error);
            // Fallback to default settings on error
            setSettings({ showDisclaimer: false, showRequirements: true });
        } finally {
            setLoading(false);
        }
    };
    fetchSettings();
    const checkDarkMode = () => {
      setDarkMode(document.body.classList.contains('dark-mode'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  if (loading) {
      return (
          <div className="flex justify-center items-center h-screen">
              <RefreshCw className="h-8 w-8 animate-spin text-[var(--primary)]" />
          </div>
      );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 md:p-12 flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
    >
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cd9023_3.png" 
        alt="לוגו האפליקציה" 
        className="h-20 w-auto mx-auto mb-6"
      />
      <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 leading-tight`}>
        ברוכים הבאים<br />למחשבון תשמ"ש
      </h1>
      <p className={`text-lg max-w-2xl mx-auto text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        מחשבון זה נועד לשמש כלי עזר להערכת זכאות וקבלת צפי לגובה קצבת תשלומי המשפחה (תשמ"ש), בהתאם לקריטריונים הקבועים בצה"ל.
      </p>
      {settings.showRequirements && (
        <>
          <hr className="my-8 w-full max-w-md mx-auto border-gray-300 dark:border-gray-700" />
          <div className={`p-6 rounded-lg border ${darkMode ? 'border-blue-600 bg-blue-900/20' : 'border-blue-400 bg-blue-50'} max-w-2xl mx-auto w-full`}>
            <h3 className={`flex items-center justify-center gap-2 text-xl font-semibold mb-4 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              <FileText className="h-6 w-6" />
              מה נצטרך?
            </h3>
            <div className={`text-base space-y-3 text-right ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>1</span>
                <p>פרטים על סוג הזכאות (אם לילד, סטודנטית, עובדת וכו')</p>
              </div>
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>2</span>
                <p>פרטי הכנסה (תלושי שכר / ממוצע הכנסה חודשית)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>3</span>
                <p>מידע על חסכונות ורכב (אם יש)</p>
              </div>
            </div>
          </div>
        </>
      )}
      {settings.showDisclaimer && (
        <>
          <hr className="my-8 w-full max-w-md mx-auto border-gray-300 dark:border-gray-700" />
          <div className={`p-6 rounded-lg border ${darkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-400 bg-yellow-50'} max-w-2xl mx-auto w-full`}>
            <h3 className={`flex items-center justify-center gap-2 text-xl font-semibold mb-3 ${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
              <CheckCircle className="h-6 w-6" />
              לתשומת לבך:
            </h3>
            <div className={`text-base space-y-2 text-center ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
              <p>הנתונים המתקבלים הם בגדר הערכה בלבד, ועשויים להשתנות בהתאם לחוקי הת"ש העדכניים או אי־דיוקים בהזנת הפרטים.</p>
              <p>הסכום הסופי נקבע על ידי משרד הת"ש בלבד.</p>
            </div>
          </div>
        </>
      )}
      <hr className="my-8 w-full max-w-md mx-auto border-gray-300 dark:border-gray-700" />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          size="lg"
          onClick={() => navigate(createPageUrl("Calculator"))}
          className="bg-[#4A593D] hover:bg-[#8E9775] text-white text-xl px-12 py-6 rounded-full shadow-lg"
        >
          בוא נתחיל
          <ArrowLeft className="h-6 w-6 mr-3" />
        </Button>
      </motion.div>
      <hr className="my-8 w-full max-w-md mx-auto border-gray-300 dark:border-gray-700" />
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        המחשבון פותח ביוזמה פרטית ובשיתוף עם קהילת "זכויות נשואים בצה"ל".
      </p>
    </motion.div>
  );
}
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronLeft, Download, FileText, SlidersHorizontal, MessageSquare, Notebook, Plus, Trash2, BookOpen, ChevronDown, ChevronUp, PanelLeftClose, PanelRightClose, Settings, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// Import constants and applicantTypeInfo to display them
import { CONSTANTS as AppConstants } from '../components/Calculator';
import { applicantTypeInfo as AppApplicantTypeInfo } from '../components/steps/ApplicantType';
import { DevNote } from '@/entities/DevNote';
import { AppSettings } from '@/entities/AppSettings';
// Helper function to stringify objects nicely
const prettyPrintJson = (jsonObj) => JSON.stringify(jsonObj, null, 2);
// Function to get file content (simulated)
const getFileContent = async (filePath) => {
    if (filePath === "CONSTANTS") {
        return prettyPrintJson(AppConstants);
    }
    if (filePath === "applicantTypeInfo") {
        return prettyPrintJson(AppApplicantTypeInfo);
    }
    return `// Content for ${filePath} - File export/display requires specific implementation.`
};
const DevNotesManager = ({ darkMode }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadNotes();
    }, []);
    const loadNotes = async () => {
        setLoading(true);
        const fetchedNotes = await DevNote.list('-created_date');
        setNotes(fetchedNotes);
        setLoading(false);
    };
    const handleAddNote = async () => {
        if (!newNote.trim()) return;
        await DevNote.create({ note: newNote, status: 'פתוח' });
        setNewNote('');
        loadNotes();
    };
    const handleDeleteNote = async (id) => {
        await DevNote.delete(id);
        loadNotes();
    };
    const handleStatusChange = async (id, status) => {
        await DevNote.update(id, { status });
        loadNotes();
    };
    return (
        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
                <CardTitle>ניהול פתקים ומשימות</CardTitle>
                <CardDescription>כלי פנימי למעקב אחר משימות, רעיונות ובאגים.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-2">
                    <Input
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="הוסף משימה או פתק חדש..."
                        className={`${darkMode ? 'bg-gray-900' : ''}`}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                    />
                    <Button onClick={handleAddNote}><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-3">
                    {loading ? <p>טוען...</p> : notes.map(note => (
                        <div key={note.id} className={`flex items-center gap-3 p-3 rounded-lg border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50/50 border-gray-200'}`}>
                            <p className="flex-grow break-words">{note.note}</p>
                            <Select value={note.status} onValueChange={(value) => handleStatusChange(note.id, value)}>
                                <SelectTrigger className={`w-[120px] ${darkMode ? 'bg-gray-800' : ''}`}>
                                    <SelectValue placeholder="סטטוס" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="פתוח">פתוח</SelectItem>
                                    <SelectItem value="בתהליך">בתהליך</SelectItem>
                                    <SelectItem value="הושלם">הושלם</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteNote(note.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
const CalculationGuide = ({ darkMode }) => {
    const [openGuides, setOpenGuides] = useState({});
    const toggleGuide = (type) => {
        setOpenGuides(prev => ({ ...prev, [type]: !prev[type] }));
    };
    const guides = {
        MOTHER_OR_PREGNANT_32: {
            title: "אם לילד / הריון (משבוע 32)",
            content: `
**מאפיינים מיוחדים של קטגוריה זו:**
• זוהי הקטגוריה המועדפת ביותר במערכת התשמ"ש
• החישוב מבוסס על מדרגות הכנסה ברוטו בלבד
• אין בדיקת תקרת הכנסה כללית (6,655 ש"ח) עבור קטגוריה זו
• אין דרישה להכנסה מינימלית
**איך עובד החישוב:**
**שלב 1:** חישוב הכנסה ברוטו חודשית ממוצעת
בדקו את התלושים שלכם או את ההכנסה החודשית הרגילה (לפני ניכויים)
**שלב 2:** קבעו את המדרגה לפי ההכנסה הברוטו:
🟢 **מדרגה ראשונה (זכאות מלאה):**
- הכנסה ברוטו עד 6,655 ש"ח לחודש
- **זכאות:** 6,655 ש"ח לחודש (100%)
🔵 **מדרגה שנייה:**
- הכנסה ברוטו בין 6,656 ל-8,000 ש"ח לחודש
- **זכאות:** 4,392 ש"ח לחודש (66%)
🟡 **מדרגה שלישית:**
- הכנסה ברוטו בין 8,001 ל-10,000 ש"ח לחודש
- **זכאות:** 3,328 ש"ח לחודש (50%)
🟠 **מדרגה רביעית:**
- הכנסה ברוטו בין 10,001 ל-11,760 ש"ח לחודש
- **זכאות:** 2,196 ש"ח לחודש (33%)
🔴 **ללא זכאות:**
- הכנסה ברוטו מעל 11,760 ש"ח לחודש
- **זכאות:** 0 ש"ח
**דוגמה מעשית:**
אם ההכנסה הברוטו שלכם היא 7,500 ש"ח לחודש:
- זה נמצא במדרגה השנייה (בין 6,656 ל-8,000)
- הזכאות תהיה: 4,392 ש"ח לחודש
**חשוב לדעת:**
- חסכונות ורכב לא משפיעים על החישוב במקרה זה
- אין צורך בהוכחת מיצוי כושר השתכרות
- זוהי הקטגוריה הנדיבה ביותר במערכת`
        },
        PREGNANT_14: {
            title: "הריון (משבוע 14)",
            content: `
**מאפיינים של קטגוריה זו:**
• תקרת זכאות מקסימלית: 5,324 ש"ח לחודש
• חישוב לפי נוסחה רגילה המבוססת על הכנסה נטו
• יש בדיקת תקרת הכנסה ברוטו כללית
• אין דרישה להכנסה מינימלית
**איך עובד החישוב:**
**שלב 1: בדיקת תקרת הכנסה ברוטו**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות עד 6,655 ש"ח.
אם ההכנסה גבוהה מזה - אין זכאות כלל.
**שלב 2: חישוב הכנסה נטו**
- אם הזנתם תלושי שכר: המערכת תחשב את הנטו (ברוטו פחות ניכויים)
- אם הזנתם ידנית: השתמשו בנתון הנטו או שהמערכת תעריך (הפרש 4.27%)
**שלב 3: התאמה לחסכונות (אם רלוונטי)**
אם יש חסכונות מעל 42,000 ש"ח:
- חשבו את העודף: (חסכונות - 42,000) ÷ 150
- הוסיפו את התוצאה להכנסה הנטו לצורך החישוב
**שלב 4: חישוב הזכאות לפי הנוסחה**
זכאות = תקרה - (70% × (הכנסה נטו מותאמת - 484))
**דוגמה מעשית:**
- הכנסה ברוטו: 6,000 ש"ח (עובר את בדיקת התקרה)
- הכנסה נטו: 5,500 ש"ח
- חסכונות: 30,000 ש"ח (מתחת לסף - לא משפיע)
חישוב:
5,324 - (0.7 × (5,500 - 484)) = 5,324 - (0.7 × 5,016) = 5,324 - 3,511 = **1,813 ש"ח לחודש**
**חשוב לדעת:**
- בעלות על רכב בשווי מעל 44,611 ש"ח שוללת זכאות
- יש להביא אישורים רפואיים מתאימים בעת הגשת הבקשה`
        },
        WORKER: {
            title: "עובדת/שאינה אם לילד",
            content: `
**מאפיינים של קטגוריה זו:**
• תקרת זכאות מקסימלית: 5,324 ש"ח לחודש
• דרישת הכנסה מינימלית: 6,247 ש"ח ברוטו לחודש
• חישוב לפי נוסחה רגילה המבוססת על הכנסה נטו
• יש בדיקת תקרת הכנסה ברוטו כללית
**איך עובד החישוב:**
**שלב 1: בדיקת תקרת הכנסה ברוטו**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות עד 6,655 ש"ח.
אם ההכנסה גבוהה מזה - אין זכאות כלל.
**שלב 2: בדיקת הכנסה מינימלית**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות לפחות 6,247 ש"ח.
אם ההכנסה נמוכה מזה - אין זכאות כלל.
(זוהי דרישה ייחודית לקטגוריה זו - מיצוי כושר השתכרות)
**שלב 3: חישוב הכנסה נטו**
- אם הזנתם תלושי שכר: המערכת תחשב את הנטו (ברוטו פחות ניכויים)
- אם הזנתם ידנית: השתמשו בנתון הנטו או שהמערכת תעריך (הפרש 4.27%)
**שלב 4: התאמה לחסכונות (אם רלוונטי)**
אם יש חסכונות מעל 42,000 ש"ח:
- חשבו את העודף: (חסכונות - 42,000) ÷ 150
- הוסיפו את התוצאה להכנסה הנטו לצורך החישוב
**שלב 5: חישוב הזכאות לפי הנוסחה**
זכאות = תקרה - (70% × (הכנסה נטו מותאמת - 484))
**דוגמה מעשית:**
- הכנסה ברוטו: 6,300 ש"ח (עובר בדיקת תקרה ומינימום)
- הכנסה נטו: 5,800 ש"ח
- חסכונות: 50,000 ש"ח
חישוב חסכונות: (50,000 - 42,000) ÷ 150 = 53 ש"ח תוספת
הכנסה נטו מותאמת: 5,800 + 53 = 5,853 ש"ח
חישוב זכאות:
5,324 - (0.7 × (5,853 - 484)) = 5,324 - (0.7 × 5,369) = 5,324 - 3,758 = **1,566 ש"ח לחודש**
**חשוב לדעת:**
- דרישת ההכנסה המינימלית נועדה להבטיח מיצוי כושר השתכרות
- בעלות על רכב בשווי מעל 44,611 ש"ח שוללת זכאות`
        },
        STUDENT_30_PLUS: {
            title: "סטודנטית (30+ שעות שבועיות)",
            content: `
**מאפיינים של קטגוריה זו:**
• תקרת זכאות מקסימלית: 4,992 ש"ח לחודש
• זכאות מלאה עד הכנסה נטו של 1,248 ש"ח (25% מהתקרה)
• אין דרישת הכנסה מינימלית
• יש בדיקת תקרת הכנסה ברוטו כללית
**איך עובד החישוב:**
**שלב 1: בדיקת תקרת הכנסה ברוטו**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות עד 6,655 ש"ח.
אם ההכנסה גבוהה מזה - אין זכאות כלל.
**שלב 2: חישוב הכנסה נטו**
- אם הזנתם תלושי שכר: המערכת תחשב את הנטו (ברוטו פחות ניכויים)
- אם הזנתם ידנית: השתמשו בנתון הנטו או שהמערכת תעריך (הפרש 4.27%)
**שלב 3: התאמה לחסכונות (אם רלוונטי)**
אם יש חסכונות מעל 42,000 ש"ח:
- חשבו את העודף: (חסכונות - 42,000) ÷ 150
- הוסיפו את התוצאה להכנסה הנטו לצורך החישוב
**שלב 4: קביעת סוג החישוב**
🟢 **אם ההכנסה הנטו המותאמת עד 1,248 ש"ח:**
זכאות מלאה = 4,992 ש"ח לחודש
🔵 **אם ההכנסה הנטו המותאמת מעל 1,248 ש"ח:**
זכאות = תקרה - (70% × (הכנסה נטו מותאמת - 484))
**דוגמה מעשית 1 (זכאות מלאה):**
- הכנסה נטו: 1,000 ש"ח (מתחת ל-1,248)
- **זכאות: 4,992 ש"ח לחודש** (זכאות מלאה)
**דוגמה מעשית 2 (חישוב רגיל):**
- הכנסה נטו: 2,500 ש"ח (מעל 1,248)
- חסכונות: 35,000 ש"ח (מתחת לסף)
חישוב:
4,992 - (0.7 × (2,500 - 484)) = 4,992 - (0.7 × 2,016) = 4,992 - 1,411 = **3,581 ש"ח לחודש**
**חשוב לדעת:**
- נדרש אישור על לימודים של 30+ שעות שבועיות
- הזכאות המלאה עד 1,248 ש"ח נועדה לעודד לימודים אקדמיים`
        },
        STUDENT_UNDER_30: {
            title: "סטודנטית (16-29 שעות שבועיות)",
            content: `
**מאפיינים של קטגוריה זו:**
• תקרת זכאות מקסימלית: 3,328 ש"ח לחודש
• זכאות מלאה עד הכנסה נטו של 1,664 ש"ח (50% מהתקרה)
• אין דרישת הכנסה מינימלית
• יש בדיקת תקרת הכנסה ברוטו כללית
**איך עובד החישוב:**
**שלב 1: בדיקת תקרת הכנסה ברוטו**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות עד 6,655 ש"ח.
אם ההכנסה גבוהה מזה - אין זכאות כלל.
**שלב 2: חישוב הכנסה נטו**
- אם הזנתם תלושי שכר: המערכת תחשב את הנטו (ברוטו פחות ניכויים)
- אם הזנתם ידנית: השתמשו בנתון הנטו או שהמערכת תעריך (הפרש 4.27%)
**שלב 3: התאמה לחסכונות (אם רלוונטי)**
אם יש חסכונות מעל 42,000 ש"ח:
- חשבו את העודף: (חסכונות - 42,000) ÷ 150
- הוסיפו את התוצאה להכנסה הנטו לצורך החישוב
**שלב 4: קביעת סוג החישוב**
🟢 **אם ההכנסה הנטו המותאמת עד 1,664 ש"ח:**
זכאות מלאה = 3,328 ש"ח לחודש
🔵 **אם ההכנסה הנטו המותאמת מעל 1,664 ש"ח:**
זכאות = תקרה - (70% × (הכנסה נטו מותאמת - 484))
**דוגמה מעשית 1 (זכאות מלאה):**
- הכנסה נטו: 1,400 ש"ח (מתחת ל-1,664)
- **זכאות: 3,328 ש"ח לחודש** (זכאות מלאה)
**דוגמה מעשית 2 (חישוב רגיל):
- הכנסה נטו: 3,000 ש"ח (מעל 1,664)
- חסכונות: 25,000 ש"ח (מתחת לסף)
חישוב:
3,328 - (0.7 × (3,000 - 484)) = 3,328 - (0.7 × 2,516) = 3,328 - 1,761 = **1,567 ש"ח לחודש**
**חשוב לדעת:**
- נדרש אישור על לימודים של 16-29 שעות שבועיות
- התקרה נמוכה יותר מאשר ללימודים של 30+ שעות
- הזכאות המלאה עד 1,664 ש"ח גבוהה יותר (50% מהתקרה)`
        },
        HIGH_SCHOOL_STUDENT: {
            title: "לומדת בתיכון / קורס מקצועי (35+ שע' שבוע')",
            content: `
**מאפיינים של קטגוריה זו:**
• תקרת זכאות מקסימלית: 5,324 ש"ח לחודש (זהה להריון משבוע 14)
• חישוב לפי נוסחה רגילה המבוססת על הכנסה נטו
• אין דרישת הכנסה מינימלית
• יש בדיקת תקרת הכנסה ברוטו כללית
**איך עובד החישוב:**
**שלב 1: בדיקת תקרת הכנסה ברוטו**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות עד 6,655 ש"ח.
אם ההכנסה גבוהה מזה - אין זכאות כלל.
**שלב 2: חישוב הכנסה נטו**
- אם הזנתם תלושי שכר: המערכת תחשב את הנטו (ברוטו פחות ניכויים)
- אם הזנתם ידנית: השתמשו בנתון הנטו או שהמערכת תעריך (הפרש 4.27%)
**שלב 3: התאמה לחסכונות (אם רלוונטי)**
אם יש חסכונות מעל 42,000 ש"ח:
- חשבו את העודף: (חסכונות - 42,000) ÷ 150
- הוסיפו את התוצאה להכנסה הנטו לצורך החישוב
**שלב 4: חישוב הזכאות לפי הנוסחה**
זכאות = תקרה - (70% × (הכנסה נטו מותאמת - 484))
**דוגמה מעשית:**
- הכנסה ברוטו: 5,500 ש"ח (עובר את בדיקת התקרה)
- הכנסה נטו: 5,000 ש"ח
- חסכונות: 20,000 ש"ח (מתחת לסף - לא משפיע)
חישוב:
5,324 - (0.7 × (5,000 - 484)) = 5,324 - (0.7 × 4,516) = 5,324 - 3,161 = **2,163 ש"ח לחודש**
**חשוב לדעת:**
- נדרש אישור מבית הספר על לימודים של 35+ שעות שבועיות
- הקטגוריה מיועדת ללומדות תיכון או קורסים מקצועיים מוכרים
- התקרה גבוהה יחסית (זהה להריון) - מעודדת השכלה והכשרה`
        },
        NEW_IMMIGRANT: {
            title: "עולה חדשה",
            content: `
**מאפיינים של קטגוריה זו:**
• תקרת זכאות מקסימלית: 5,324 ש"ח לחודש (זהה להריון משבוע 14)
• חישוב לפי נוסחה רגילה המבוססת על הכנסה נטו
• אין דרישת הכנסה מינימלית
• יש בדיקת תקרת הכנסה ברוטו כללית
• **דרישות מיוחדות:** אישור עולה ואישור אולפן
**איך עובד החישוב:**
**שלב 1: בדיקת תקרת הכנסה ברוטו**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות עד 6,655 ש"ח.
אם ההכנסה גבוהה מזה - אין זכאות כלל.
**שלב 2: חישוב הכנסה נטו**
- אם הזנתם תלושי שכר: המערכת תחשב את הנטו (ברוטו פחות ניכויים)
- אם הזנתם ידנית: השתמשו בנתון הנטו או שהמערכת תעריך (הפרש 4.27%)
**שלב 3: התאמה לחסכונות (אם רלוונטי)**
אם יש חסכונות מעל 42,000 ש"ח:
- חשבו את העודף: (חסכונות - 42,000) ÷ 150
- הוסיפו את התוצאה להכנסה הנטו לצורך החישוב
**שלב 4: חישוב הזכאות לפי הנוסחה**
זכאות = תקרה - (70% × (הכנסה נטו מותאמת - 484))
**דוגמה מעשית:**
- הכנסה ברוטו: 4,500 ש"ח (עובר את בדיקת התקרה)
- הכנסה נטו: 4,000 ש"ח
- חסכונות: 15,00ון0 ש"ח (מתחת לסף - לא משפיע)
חישוב:
5,324 - (0.7 × (4,000 - 484)) = 5,324 - (0.7 × 3,516) = 5,324 - 2,461 = **2,863 ש"ח לחודש**
**מסמכים נדרשים:**
🔸 **אישור עולה:** מתעודת העולה או ממשרד הפנים
🔸 **אישור אולפן:** אישור על רישום או סיום לימודי עברית באולפן מוכר
**חשוב לדעת:**
- הקטגוריה מיועדת לעולות חדשות המתקשות עדיין בשפה ובשוק העבודה
- התקרה גבוהה יחסית - מבטאת את המדיניות לעידוד קליטה
- בלי המסמכים הנדרשים לא ניתן לקבל את הסיוע למרות עמידה בתנאי ההכנסה`
        },
        SOLDIER_SPOUSE: {
            title: "אשת חייל חיילת / שירות לאומי",
            content: `
**מאפיינים של קטגוריה זו:**
• תקרת זכאות מקסימלית: 4,992 ש"ח לחודש
• חישוב לפי נוסחה רגילה המבוססת על הכנסה נטו
• אין דרישת הכנסה מינימלית
• יש בדיקת תקרת הכנסה ברוטו כללית
**איך עובד החישוב:**
**שלב 1: בדיקת תקרת הכנסה ברוטו**
ההכנסה הברוטו החודשית הממוצעת חייבת להיות עד 6,655 ש"ח.
אם ההכנסה גבוהה מזה - אין זכאות כלל.
**שלב 2: חישוב הכנסה נטו**
- אם הזנתם תלושי שכר: המערכת תחשב את הנטו (ברוטו פחות ניכויים)
- אם הזנתם ידנית: השתמשו בנתון הנטו או שהמערכת תעריך (הפרש 4.27%)
**שלב 3: התאמה לחסכונות (אם רלוונטי)**
אם יש חסכונות מעל 42,000 ש"ח:
- חשבו את העודף: (חסכונות - 42,000) ÷ 150
- הוסיפו את התוצאה להכנסה הנטו לצורך החישוב
**שלב 4: חישוב הזכאות לפי הנוסחה**
זכאות = תקרה - (70% × (הכנסה נטו מותאמת - 484))
**דוגמה מעשית:**
- הכנסה ברוטו: 5,800 ש"ח (עובר את בדיקת התקרה)
- הכנסה נטו: 5,200 ש"ח
- חסכונות: 60,000 ש"ח
חישוב חסכונות: (60,000 - 42,000) ÷ 150 = 120 ש"ח תוספת
הכנסה נטו מותאמת: 5,200 + 120 = 5,320 ש"ח
חישוב זכאות:
4,992 - (0.7 × (5,320 - 484)) = 4,992 - (0.7 × 4,836) = 4,992 - 3,385 = **1,607 ש"ח לחודש**
**מסמכים נדרשים:**
🔸 **אישור שירות צבאי של בן הזוג:** צו גיוס, תעודת חייל או אישור מיחידתו
🔸 **אישור נישואין או ידוע בציבור**
**חשוב לדעת:**
- הקטגוריה מיועדת לתמוך בנשים שבני זוגן משרתים בצבא
- התקרה בינונית - מאזנת בין תמיכה לזמינות תקציבית
- חשוב לעדכן בסיום השירות הצבאי כדי לא לקבל כספים ביתר`
        }
    };
    return (
        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
                <CardTitle>מדריך חישוב מפורט לכל סוג מבקש</CardTitle>
                <CardDescription>לחצו על כל קטגוריה לקבלת הסבר מלא ומפורט על אופן החישוב</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Object.entries(guides).map(([type, guide]) => (
                        <Collapsible key={type} open={openGuides[type]} onOpenChange={() => toggleGuide(type)}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={`w-full justify-between p-4 h-auto text-right ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                                >
                                    <span className="font-semibold text-base">{guide.title}</span>
                                    {openGuides[type] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-3 mt-3">
                                <div className={`p-6 rounded-lg border ${darkMode ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                                    <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                                        <div className="whitespace-pre-wrap break-words">{guide.content}</div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
                <div className={`mt-8 p-4 rounded-lg border ${darkMode ? 'bg-blue-900/20 border-blue-500/50' : 'bg-blue-50 border-blue-200'}`}>
                    <h3 className={`font-semibold mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>כללים נוספים חשובים לכל הקטגוריות:</h3>
                    <ul className={`text-sm space-y-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        <li>🚗 <strong>רכב:</strong> בעלות על רכב ששווי מעל 44,611 ש"ח שוללת זכאות לחלוטין</li>
                        <li>🚗 <strong>רכבים מרובים:</strong> בעלות על יותר מרכב אחד עלולה לשלול זכאות גם אם הערך נמוך</li>
                        <li>💰 <strong>חסכונות:</strong> חסכונות מעל 42,000 ש"ח משפיעים על החישוב (כל 150 ש"ח = 1 ש"ח תוספת להכנסה)</li>
                        <li>🧮 <strong>נקודות זיכוי:</strong> 484 ש"ח - סכום קבוע שמופחת מההכנסה בכל החישובים</li>
                        <li>📊 <strong>מקדם הפחתה:</strong> 70% (0.7) - אחוז קבוע להפחתה מההכנסה המותאמת</li>
                        <li>💼 <strong>הכנסה ברוטו:</strong> הכנסה לפני ניכויי מס, ביטוח לאומי ובריאות</li>
                        <li>💵 <strong>הכנסה נטו:</strong> הכנסה אחרי כל הניכויים החובה</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};
export default function DeveloperOptionsPage() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const [selectedFile, setSelectedFile] = useState("CONSTANTS");
    const [activeTab, setActiveTab] = useState("display_settings");
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [appSettings, setAppSettings] = useState(null);
    useEffect(() => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        setDarkMode(isDarkMode);
        loadSettings();
    }, []);
    const loadSettings = async () => {
        setLoadingSettings(true);
        try {
            const settingsList = await AppSettings.list();
            if (settingsList.length > 0) {
                setAppSettings(settingsList[0]);
            } else {
                const defaultSettings = {
                    showDisclaimerBox: false,
                    showRequirementsBox: true,
                    hiddenApplicantTypes: []
                };
                const newSettings = await AppSettings.create(defaultSettings);
                setAppSettings(newSettings);
            }
        } catch (error) {
            console.error("Error loading or creating settings:", error);
        } finally {
            setLoadingSettings(false);
        }
    };
    const handleSettingToggle = async (key, checked) => {
        if (!appSettings) return;
        const newSettings = { ...appSettings, [key]: checked };
        setAppSettings(newSettings); // Optimistic update
        await AppSettings.update(appSettings.id, { [key]: checked });
    };
    const handleApplicantTypeToggle = async (type, isVisible) => {
        if (!appSettings) return;
        const currentHidden = appSettings.hiddenApplicantTypes || [];
        let newHiddenTypes;
        if (!isVisible) {
            newHiddenTypes = [...currentHidden, type];
        } else {
            newHiddenTypes = currentHidden.filter(t => t !== type);
        }
        const newSettings = { ...appSettings, hiddenApplicantTypes: newHiddenTypes };
        setAppSettings(newSettings);
        await AppSettings.update(appSettings.id, { hiddenApplicantTypes: newHiddenTypes });
    };
    useEffect(() => {
        const fetchContent = async () => {
            const content = await getFileContent(selectedFile);
            setFileContent(content);
        };
        fetchContent();
    }, [selectedFile]);
    const handleCopyContent = () => {
        navigator.clipboard.writeText(fileContent);
        alert("תוכן הועתק ללוח!");
    };
    const filesToDisplay = [
        { label: "קבועים (CONSTANTS)", value: "CONSTANTS" },
        { label: "סוגי מבקשים (applicantTypeInfo)", value: "applicantTypeInfo" },
        // Removed Calculator.jsx for now, as per outline change to getFileContent
        // { label: "קובץ ראשי (Calculator.jsx)", value: "components/Calculator.jsx" },
    ];
    const tabConfig = [
        { id: "dev_notes", label: "ניהול פתקים", icon: Notebook, desc: "משימות ורעיונות" },
        { id: "calculation_guide", label: "מדריך חישוב", icon: BookOpen, desc: "הסברים מפורטים" },
        { id: "display_settings", label: "הגדרות תצוגה", icon: Settings, desc: "שליטה על רכיבים" },
        { id: "view_data", label: "הצג נתונים", icon: FileText, desc: "צפייה בקבצים" },
        { id: "edit_data", label: "עריכת נתונים", icon: SlidersHorizontal, desc: "הדגמה" },
        { id: "view_feedback", label: "הצג משובים", icon: MessageSquare, desc: "משובי משתמשים", action: () => navigate(createPageUrl('FeedbackView')) }
    ];
    const getTabContent = () => {
        if (loadingSettings && activeTab === 'display_settings') {
            return (
                <div className="flex justify-center items-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin text-[var(--primary)]" />
                </div>
            );
        }
        switch(activeTab) {
            case "dev_notes":
                return <DevNotesManager darkMode={darkMode} />;
            case "calculation_guide":
                return <CalculationGuide darkMode={darkMode} />;
            case "display_settings":
                return (
                    <div className="space-y-6">
                        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                            <CardHeader>
                                <CardTitle>הגדרות תצוגה כלליות</CardTitle>
                                <CardDescription>
                                    שליטה על הופעת רכיבים שונים באפליקציה. השינויים כאן ישפיעו על כלל המשתמשים.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className={`flex items-center justify-between p-4 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex-1">
                                        <Label htmlFor="disclaimer-toggle" className="font-semibold text-base">תיבת "לתשומת לבך" בעמוד הפתיחה</Label>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>הצג או הסתר את תיבת ההבהרה שמופיעה בעמוד הראשי.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                            appSettings?.showDisclaimerBox 
                                                ? (darkMode ? 'bg-green-900 text-green-200 border border-green-700' : 'bg-green-100 text-green-800 border border-green-300')
                                                : (darkMode ? 'bg-red-900 text-red-200 border border-red-700' : 'bg-red-100 text-red-800 border border-red-300')
                                        }`}>
                                            {appSettings?.showDisclaimerBox ? 'מוצג' : 'מוסתר'}
                                        </span>
                                        <Switch
                                            id="disclaimer-toggle"
                                            checked={appSettings?.showDisclaimerBox || false}
                                            onCheckedChange={(checked) => handleSettingToggle('showDisclaimerBox', checked)}
                                        />
                                    </div>
                                </div>
                                <div className={`flex items-center justify-between p-4 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                    <div className="flex-1">
                                        <Label htmlFor="requirements-toggle" className="font-semibold text-base">תיבת "מה נצטרך?" בעמוד הפתיחה</Label>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>הצג או הסתר את תיבת המידע על המסמכים הנדרשים.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                            appSettings?.showRequirementsBox 
                                                ? (darkMode ? 'bg-green-900 text-green-200 border border-green-700' : 'bg-green-100 text-green-800 border border-green-300')
                                                : (darkMode ? 'bg-red-900 text-red-200 border border-red-700' : 'bg-red-100 text-red-800 border border-red-300')
                                        }`}>
                                            {appSettings?.showRequirementsBox ? 'מוצג' : 'מוסתר'}
                                        </span>
                                        <Switch
                                            id="requirements-toggle"
                                            checked={appSettings?.showRequirementsBox || false}
                                            onCheckedChange={(checked) => handleSettingToggle('showRequirementsBox', checked)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                            <CardHeader>
                                <CardTitle>שליטה על סוגי מבקשים</CardTitle>
                                <CardDescription>
                                    הפעל או כבה את התצוגה של סוגי מבקשים באפליקציה. סוג מבקש שיכבה לא יופיע בבחירת סוגי המבקשים במחשבון.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {Object.entries(AppApplicantTypeInfo).map(([type, info]) => {
                                    const isVisible = !appSettings?.hiddenApplicantTypes?.includes(type);
                                    return (
                                        <div key={type} className={`flex items-center justify-between p-4 border rounded-lg ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <div className="flex-1">
                                                <Label htmlFor={`type-${type}`} className="font-semibold text-base">{info.title}</Label>
                                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{info.description}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                    isVisible 
                                                        ? (darkMode ? 'bg-green-900 text-green-200 border border-green-700' : 'bg-green-100 text-green-800 border border-green-300')
                                                        : (darkMode ? 'bg-red-900 text-red-200 border border-red-700' : 'bg-red-100 text-red-800 border border-red-300')
                                                }`}>
                                                    {isVisible ? 'מוצג' : 'מוסתר'}
                                                </span>
                                                <Switch
                                                    id={`type-${type}`}
                                                    checked={isVisible}
                                                    onCheckedChange={(checked) => handleApplicantTypeToggle(type, checked)}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>
                );
            case "view_data":
                return (
                    <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                        <CardHeader>
                            <CardTitle>הצגת נתונים וסימולציית ייצוא קבצים</CardTitle>
                            <CardDescription>
                                בחר קובץ/אובייקט להצגת תוכנו. תוכל להעתיק את התוכן.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2 flex-wrap">
                                {filesToDisplay.map(file => (
                                    <Button
                                        key={file.value}
                                        variant={selectedFile === file.value ? "default" : "outline"}
                                        onClick={() => setSelectedFile(file.value)}
                                        className={`${darkMode && selectedFile !== file.value ? 'border-gray-600 hover:bg-gray-700' : ''}`}
                                    >
                                        {file.label}
                                    </Button>
                                ))}
                            </div>
                            <Textarea
                                readOnly
                                value={fileContent}
                                className={`min-h-[400px] font-mono text-xs ${darkMode ? 'bg-gray-900 text-gray-300 border-gray-700' : 'bg-gray-50'}`}
                                dir="ltr"
                            />
                            <Button onClick={handleCopyContent} className={`${darkMode ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'}`}>
                                <Download className="ml-2 h-4 w-4" /> העתק תוכן
                            </Button>
                        </CardContent>
                    </Card>
                );
            case "edit_data":
                return (
                    <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                        <CardHeader>
                            <CardTitle>עריכת נתונים (הדגמה)</CardTitle>
                            <CardDescription>
                                חלק זה מיועד להדגים כיצד ניתן היה לאפשר עריכת נתונים.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm">
                                לדוגמה, ניתן היה להציג כאן טופס המאפשר לשנות ערכים באובייקט <code>CONSTANTS</code> או <code>applicantTypeInfo</code>.
                            </p>
                            <div className={`p-4 border rounded-md ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                                <h3 className="font-semibold mb-2">דוגמת קבועים (CONSTANTS):</h3>
                                <pre className="text-xs overflow-auto max-h-60 break-all">{prettyPrintJson(AppConstants)}</pre>
                            </div>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`min-h-screen ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
        >
            <div className="flex h-screen">
                {/* Sidebar */}
                <motion.div
                    animate={{ width: isSidebarCollapsed ? 80 : 256 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`flex flex-col border-l relative ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                    <div className="p-4 border-b flex justify-between items-center">
                        <motion.h1
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isSidebarCollapsed ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-xl font-bold"
                        >אפשרויות</motion.h1>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        >
                            {isSidebarCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
                        </Button>
                    </div>
                    <motion.div
                        animate={{ opacity: isSidebarCollapsed ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 border-b ${isSidebarCollapsed ? 'hidden' : ''}`}
                    >
                        <Button variant="outline" onClick={() => navigate(createPageUrl('Home'))} className={`w-full ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            <ChevronLeft className="ml-2 h-4 w-4" /> חזור למחשבון
                        </Button>
                    </motion.div>
                    <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
                        {tabConfig.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <Button
                                    key={tab.id}
                                    variant={activeTab === tab.id ? "default" : "ghost"}
                                    className={`w-full h-auto p-3 flex text-right ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} ${
                                        activeTab === tab.id
                                            ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white')
                                            : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
                                    }`}
                                    onClick={tab.action || (() => setActiveTab(tab.id))}
                                    title={isSidebarCollapsed ? tab.label : ''}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    {!isSidebarCollapsed && (
                                        <div className="flex-1 mr-3">
                                            <div className="font-medium text-sm">{tab.label}</div>
                                            <div className={`text-xs mt-0.5 ${
                                                activeTab === tab.id ? 'text-white/80' : (darkMode ? 'text-gray-400' : 'text-gray-500')
                                            }`}>
                                                {tab.desc}
                                            </div>
                                        </div>
                                    )}
                                </Button>
                            );
                        })}
                    </nav>
                </motion.div>
                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        {getTabContent()}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
import React, { useState, useEffect } from 'react';
import { Feedback } from '@/entities/Feedback';
import { User } from '@/entities/User';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, RefreshCw, UserCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
export default function FeedbackViewPage() {
    const navigate = useNavigate();
    const [feedbackEntries, setFeedbackEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [allUsers, setAllUsers] = useState({}); // To store user details
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [feedbackToDelete, setFeedbackToDelete] = useState(null);
    useEffect(() => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        setDarkMode(isDarkMode);
        loadFeedback();
        fetchAllUsers();
    }, []);
    const loadFeedback = async () => {
        setLoading(true);
        try {
            const entries = await Feedback.list('-created_date'); // Sort by newest first
            setFeedbackEntries(entries);
        } catch (error) {
            console.error("Error loading feedback:", error);
            // Handle error display to user if necessary
        } finally {
            setLoading(false);
        }
    };
    const fetchAllUsers = async () => {
        try {
            const users = await User.list();
            const usersMap = users.reduce((acc, user) => {
                acc[user.email] = user; // Assuming created_by stores email
                return acc;
            }, {});
            setAllUsers(usersMap);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    const getUserDisplayName = (createdByEmail) => {
        const user = allUsers[createdByEmail];
        if (user && user.full_name) return user.full_name;
        if (createdByEmail) return createdByEmail.split('@')[0]; // Show part of email if name not found
        return "אנונימי";
    };
    const handleDeleteClick = (feedback) => {
        setFeedbackToDelete(feedback);
        setShowDeleteDialog(true);
    };
    const confirmDelete = async () => {
        if (!feedbackToDelete) return;
        try {
            await Feedback.delete(feedbackToDelete.id);
            setShowDeleteDialog(false);
            setFeedbackToDelete(null);
            loadFeedback(); // Reload feedback list
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("שגיאה במחיקת המשוב.");
        }
    };
    const renderCalculatorData = (userData) => {
        if (!userData) return <span className="text-xs text-gray-500 italic">אין נתוני מחשבון</span>;
        return (
            <ul className="text-xs list-disc pl-4 space-y-0.5">
                {userData.applicantType && <li><strong>סוג:</strong> {userData.applicantType}</li>}
                {userData.incomeMethod && <li><strong>שיטת הכנסה:</strong> {userData.incomeMethod}</li>}
                {userData.manualIncomeGross && <li><strong>ברוטו ידני:</strong> {userData.manualIncomeGross}</li>}
                {userData.manualIncomeNet && <li><strong>נטו ידני:</strong> {userData.manualIncomeNet}</li>}
                {userData.savings && <li><strong>חסכונות:</strong> {userData.savings}</li>}
                {userData.hasCar !== undefined && <li><strong>רכב:</strong> {userData.hasCar ? `כן (שווי: ${userData.carValue || 'לא צוין'})` : 'לא'}</li>}
                {userData.calculatedAmount !== undefined && <li><strong>סכום מחושב:</strong> {userData.isEligible ? `₪${userData.calculatedAmount}` : 'אין זכאות'}</li>}
            </ul>
        );
    };
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className={`p-4 md:p-6 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">צפייה במשובים</h1>
                <div className="flex gap-2">
                     <Button variant="outline" onClick={() => navigate(createPageUrl('DeveloperOptions'))} className={`${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <ArrowLeft className="ml-2 h-4 w-4" /> חזור לאפשרויות מפתחים
                    </Button>
                    <Button onClick={loadFeedback} disabled={loading} variant="outline" className={`${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <RefreshCw className={`ml-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> רענן
                    </Button>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <RefreshCw className="h-8 w-8 animate-spin text-[var(--primary)]" />
                </div>
            ) : feedbackEntries.length === 0 ? (
                <p className="text-center text-lg">לא נמצאו משובים.</p>
            ) : (
                <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                    <CardHeader>
                        <CardTitle>רשימת משובים</CardTitle>
                        <CardDescription>סה"כ {feedbackEntries.length} משובים</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] w-full">
                            <Table>
                                <TableHeader className={`${darkMode ? 'bg-gray-700 sticky top-0' : 'bg-gray-100 sticky top-0'}`}>
                                    <TableRow>
                                        <TableHead className="w-[150px]">תאריך</TableHead>
                                        <TableHead className="w-[150px]">משתמש</TableHead>
                                        <TableHead>הערה</TableHead>
                                        <TableHead className="w-[150px]">פרטי קשר</TableHead>
                                        <TableHead className="w-[250px]">נתוני מחשבון</TableHead>
                                        <TableHead className="w-[120px]">הקשר</TableHead>
                                        <TableHead className="w-[80px]">פעולות</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feedbackEntries.map((entry) => (
                                        <TableRow key={entry.id} className={`${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'}`}>
                                            <TableCell className="font-medium text-sm">
                                                {format(new Date(entry.created_date), 'dd/MM/yyyy HH:mm')}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                <div className="flex items-center gap-1">
                                                    <UserCircle className="h-4 w-4 opacity-70"/> 
                                                    {getUserDisplayName(entry.created_by)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm whitespace-pre-wrap break-words">{entry.comment}</TableCell>
                                            <TableCell className="text-sm">{entry.contact_info || '-'}</TableCell>
                                            <TableCell>{renderCalculatorData(entry.user_data)}</TableCell>
                                            <TableCell className="text-sm">{entry.page_context || '-'}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteClick(entry)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className={darkMode ? 'dark-mode' : ''}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>אישור מחיקה</AlertDialogTitle>
                        <AlertDialogDescription>
                            האם אתה בטוח שברצונך למחוק את המשוב הזה? לא ניתן לשחזר פעולה זו.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>ביטול</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className={`${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                        >
                            מחק
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    );
}
import React from "react";
import CalculatorComponent from "../components/Calculator";
export default function Calculator() {
  return (
    <CalculatorComponent />
  );
}
import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
export default function ProgressBar({ steps, currentStep, darkMode, onStepClick }) {
  return (
    <div className={`py-6 px-4 md:px-8 border-b ${darkMode ? 'bg-[#232830] border-[#5D6D53]' : 'bg-[#F7F4EA]'}`}>
      <div className="flex items-center justify-between mobile-fix overflow-x-auto py-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isVisited = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isPastOrCurrent = stepNumber <= currentStep;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center relative min-w-[70px]"
              onClick={() => isPastOrCurrent && onStepClick(stepNumber)}
              style={{ cursor: isPastOrCurrent ? 'pointer' : 'default' }}
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  opacity: isPastOrCurrent ? 1 : 0.6 
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-full flex items-center justify-center h-10 w-10 text-sm font-medium border-2 z-10
                  ${isVisited
                    ? darkMode ? "bg-[#7D8F69] border-[#7D8F69] text-white" : "bg-[#4A593D] border-[#4A593D] text-white" 
                    : isActive 
                      ? darkMode ? "bg-[#7D8F69] border-[#7D8F69] text-white" : "bg-[#4A593D] border-[#4A593D] text-white" 
                      : darkMode ? "bg-[#292F36] border-[#5D6D53] text-[#F7F4EA]" : "bg-white border-[#C4C1A4] text-[#394428]"
                  }`}
              >
                {isVisited ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </motion.div>
              <div className="text-xs mt-2 font-medium text-center max-w-[80px] break-word-fix">
                <span className={
                  isPastOrCurrent 
                    ? darkMode ? "text-[#F7F4EA]" : "text-[#394428]" 
                    : darkMode ? "text-[#F7F4EA]/70" : "text-[#394428]/70"
                }>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className="absolute h-0.5 top-5 right-1/2 z-0"
                  style={{ width: "calc(100% - 2.5rem)" }}
                >
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ 
                      width: isVisited ? "100%" : "0%" 
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`h-full ${darkMode ? 'bg-[#5D6D53]' : 'bg-[#C4C1A4]'}`}
                  ></motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, RefreshCw, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from './ProgressBar';
import ApplicantType from './steps/ApplicantType';
import IncomeInput from './steps/IncomeInput';
import AdditionalQuestions from './steps/AdditionalQuestions';
import Results from './steps/Results';
import { AppSettings } from '@/entities/AppSettings';
export const CONSTANTS = {
  MAX_CEILING: 6655,
  TASHMASH_CEILINGS: {
    MOTHER_OR_PREGNANT_32: 6655,
    PREGNANT_14: 5324,
    STUDENT_30_PLUS: 4992,
    STUDENT_UNDER_30: 3328,
    WORKER: 5324,
    SOLDIER_SPOUSE: 4992,
  },
  MOTHER_THRESHOLDS: {
    FULL: 6655, // עודכן מ-6246 ל-6655
    LEVEL_66: 8000,
    LEVEL_50: 10000,
    LEVEL_33: 11760,
  },
  CAR_MAX_VALUE: 44611,
  MINIMUM_WAGE: 6260.32,
  WORKER_MIN_INCOME: 6247, // עודכן מ-5880 ל-6247
  SAVINGS_THRESHOLD: 42000, // עודכן מ-44000 ל-42000
  SAVINGS_FACTOR: 150,
  CREDIT_POINTS: 484,
  INCOME_FACTOR: 0.7,
  MAX_INPUT: 100000,
  MAX_SAVINGS: 1000000,
};
// מידע הסברתי לכל שלב
const STEP_INFO = {
  step1: {
    title: "סוגי מבקשים",
    content: `הזכאות לתשלומי משפחה (תשמ"ש) נקבעת באופן שונה עבור כל סוג מבקש. לכל קטגוריה יש תקרת זכאות מקסימלית שונה ומנגנון חישוב ייחודי. בחרו את הקטגוריה המתאימה לכם ביותר.`
  },
  step2: {
    title: "חישוב הכנסה חודשית ממוצעת",
    content: `ההכנסה החודשית הממוצעת היא גורם מרכזי בקביעת הזכאות. ניתן לחשב אותה בשלוש דרכים:
1.  **לפי תלושי שכר:** הזינו נתונים משלושת תלושי השכר האחרונים שלכם. המערכת תחשב את הממוצע.
2.  **הזנה ידנית:** הזינו את סכום ההכנסה החודשית הממוצעת שלכם (ברוטו או נטו). אם תזינו רק ערך אחד, המערכת תעריך את השני. אם תזינו את שניהם, המערכת תשתמש בנתונים שהוזנו.
3.  **לא עובדת:** אם אינך עובדת, בחרי באפשרות זו. שימי לב שאם בחרת בסוג מבקש "עובדת", אפשרות זו תשלול את זכאותך.`
  },
  step3: {
    title: "השפעת חסכונות ורכב על הזכאות",
    content: `פרמטרים נוספים העשויים להשפיע על זכאותכם:
• **חסכונות:** חסכונות מעל ₪${CONSTANTS.SAVINGS_THRESHOLD.toLocaleString('he-IL')} משפיעים על החישוב. כל ₪${CONSTANTS.SAVINGS_FACTOR.toLocaleString('he-IL')} מעל הסף, נחשבים כתוספת של ₪1 להכנסה החודשית.
• **רכב:** בעלות על רכב ששוויו עולה על ₪${CONSTANTS.CAR_MAX_VALUE.toLocaleString('he-IL')} עלולה לשלול את הזכאות לתשמ"ש. בעלות על יותר מרכב אחד עלולה גם כן לשלול את הזכאות.`
  },
  step4: {
    title: "סיכום וחישוב הזכאות לתשמ\"ש",
    content: `בשלב זה יוצגו תוצאות החישוב בהתאם לנתונים שהוזנו.
כל סוג מבקש נבדק תחילה מול תקרת הכנסה ברוטו כללית של ₪${CONSTANTS.MAX_CEILING.toLocaleString('he-IL')}.
לאחר מכן, מבוצע מבחן הכנסה לפי הנוסחה: תקרת זכאות פחות 70% מההכנסה נטו (לאחר הפחתת נקודות זיכוי בסך ₪${CONSTANTS.CREDIT_POINTS.toLocaleString('he-IL')}).
לאמהות ונשים בהריון מתקדם, וכן לסטודנטיות, קיימות מדרגות זכאות ייחודיות.`
  },
};
export default function Calculator() {
  const [state, setState] = useState({
    currentStep: 1,
    applicantType: null,
    incomeMethod: null, // יכול להיות 'slips', 'manual', 'not_working'
    salarySlips: [
      { gross: '', deductions: '', oneTime: '0' },
      { gross: '', deductions: '', oneTime: '0' },
      { gross: '', deductions: '', oneTime: '0' }, // Added for the new question
    ],
    manualIncome: { gross: '', net: '' },
    savings: '',
    hasCar: false,
    carValue: '',
    hasAllowances: false, // Added for the new question
    results: null,
    errors: {},
  });
  const [showInfo, setShowInfo] = useState(false);
  const [showInterimResults, setShowInterimResults] = useState(false);
  const [interimResults, setInterimResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [appSettings, setAppSettings] = useState({ hiddenApplicantTypes: [] });
  useEffect(() => {
    const fetchSettings = async () => {
        const settingsList = await AppSettings.list();
        if (settingsList.length > 0) {
            setAppSettings(settingsList[0]);
        }
    };
    fetchSettings();
    const checkDarkMode = () => {
      const isDarkMode = document.body.classList.contains('dark-mode');
      setDarkMode(isDarkMode);
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  // שלבי התהליך
  const steps = ["סוג מבקש", "הכנסה", "שאלות נוספות", "תוצאות"];
  // חישוב תוצאות ביניים בכל שינוי בנתונים רלוונטיים
  useEffect(() => {
    // בדיקה אם יש מספיק נתונים לחישוב ביניים
    if (state.applicantType) {
      let canCalculate = false;
      if (state.incomeMethod === 'slips' && state.salarySlips.some(slip => slip.gross)) {
        canCalculate = true;
      } else if (state.incomeMethod === 'manual' && (state.manualIncome.gross || state.manualIncome.net)) {
        canCalculate = true;
      } else if (state.incomeMethod === 'not_working') {
        canCalculate = true;
      }
      if (canCalculate) {
        const results = calculateTashmash();
        setInterimResults(results);
        setShowInterimResults(true);
      } else {
        setShowInterimResults(false);
        setInterimResults(null);
      }
    } else {
      setShowInterimResults(false);
      setInterimResults(null);
    }
  }, [state.applicantType, state.incomeMethod, state.salarySlips, state.manualIncome.gross, state.manualIncome.net, state.savings, state.hasCar, state.carValue]);
  const validateStep = (stepToValidate = state.currentStep) => {
    const errors = {};
    switch (stepToValidate) {
      case 1:
        // אין צורך בולידציה כי הבחירה מועברת אוטומטית
        break;
      case 2:
        if (!state.incomeMethod) {
          errors.incomeMethod = "יש לבחור שיטת הזנת הכנסה";
        } else if (state.incomeMethod === 'slips') {
          let hasInput = false;
          state.salarySlips.forEach((slip, index) => {
            if (slip.gross) {
              hasInput = true;
              if (isNaN(slip.gross) || parseFloat(slip.gross) < 0 || parseFloat(slip.gross) > CONSTANTS.MAX_INPUT) {
                errors[`gross_${index}`] = `הכנסה ברוטו חייבת להיות מספר חיובי עד ${CONSTANTS.MAX_INPUT.toLocaleString('he-IL')}`;
              }
              if (slip.deductions && (isNaN(slip.deductions) || parseFloat(slip.deductions) < 0 || parseFloat(slip.deductions) > parseFloat(slip.gross))) {
                errors[`deductions_${index}`] = "ניכויי חובה חייבים להיות מספר חיובי ונמוך מהברוטו";
              }
            }
          });
          if (!hasInput) {
            errors.slips = "יש להזין לפחות תלוש שכר אחד";
          }
          if(state.applicantType === 'WORKER' && hasInput) {
            const { averageGross } = calculateNetFromSlips();
            if(averageGross < CONSTANTS.WORKER_MIN_INCOME) {
              errors.slips = `שכר ברוטו ממוצע (₪${averageGross.toLocaleString('he-IL')}) נמוך מהסף המינימלי לעובדת/שאינה אם לילד (₪${CONSTANTS.WORKER_MIN_INCOME.toLocaleString('he-IL')}).`;
            }
          }
        } else if (state.incomeMethod === 'manual') {
          const manualGross = parseFloat(state.manualIncome.gross);
          const manualNet = parseFloat(state.manualIncome.net);
          if (!state.manualIncome.gross && !state.manualIncome.net) {
            errors.manualIncome = `יש להזין הכנסה ברוטו או נטו`;
          } else {
            if (state.manualIncome.gross && (isNaN(manualGross) || manualGross < 0 || manualGross > CONSTANTS.MAX_INPUT)) {
              errors.manualGross = `הכנסה ברוטו חייבת להיות מספר חיובי עד ${CONSTANTS.MAX_INPUT.toLocaleString('he-IL')}`;
            }
            if (state.manualIncome.net && (isNaN(manualNet) || manualNet < 0 || manualNet > CONSTANTS.MAX_INPUT)) {
              errors.manualNet = `הכנסה נטו חייבת להיות מספר חיובי עד ${CONSTANTS.MAX_INPUT.toLocaleString('he-IL')}`;
            }
            if (state.manualIncome.gross && state.manualIncome.net && manualGross < manualNet) {
                errors.manualIncome = 'הכנסה ברוטו לא יכולה להיות נמוכה מהכנסה נטו';
            }
            let grossToCheckWorker = manualGross;
            if (!state.manualIncome.gross && state.manualIncome.net && !isNaN(manualNet) && manualNet > 0) {
                 grossToCheckWorker = Math.round(manualNet / 0.9573); // Updated to 0.9573
            }
            if (state.applicantType === 'WORKER' && grossToCheckWorker) {
              if (grossToCheckWorker < CONSTANTS.WORKER_MIN_INCOME) {
                errors.manualGross = `הכנסה ברוטו משוערת (₪${grossToCheckWorker.toLocaleString('he-IL')}) נמוכה מהסף המינימלי לעובדת/שאינה אם לילד (₪${CONSTANTS.WORKER_MIN_INCOME.toLocaleString('he-IL')}).`;
              }
            }
          }
        }
        // אין צורך בולידציה ל 'not_working' כי אין קלט
        break;
      case 3:
        if (state.savings !== '' && (isNaN(state.savings) || parseFloat(state.savings) < 0 || parseFloat(state.savings) > CONSTANTS.MAX_SAVINGS)) {
          errors.savings = `חסכונות חייבים להיות מספר חיובי עד ${CONSTANTS.MAX_SAVINGS}`;
        }
        if (state.hasCar && (!state.carValue || isNaN(state.carValue) || parseFloat(state.carValue) < 0 || parseFloat(state.carValue) > CONSTANTS.MAX_INPUT)) {
          errors.carValue = `שווי רכב חייב להיות מספר חיובי עד ${CONSTANTS.MAX_INPUT}`;
        }
        break;
    }
    setState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };
  // חישוב נטו מתלושי שכר
  const calculateNetFromSlips = () => {
    let totalGross = 0;
    let totalNet = 0;
    let validMonths = 0;
    state.salarySlips.forEach(slip => {
      if (slip.gross && !isNaN(slip.gross)) {
        const gross = parseFloat(slip.gross);
        const deductions = parseFloat(slip.deductions) || 0;
        totalGross += gross;
        totalNet += (gross - deductions);
        validMonths++;
      }
    });
    return {
      averageGross: validMonths > 0 ? totalGross / validMonths : 0,
      averageNet: validMonths > 0 ? totalNet / validMonths : 0,
    };
  };
  const calculateTashmash = () => {
    let ceiling;
    let method = "";
    const reasons = [];
    switch (state.applicantType) {
      case 'MOTHER_OR_PREGNANT_32': 
        ceiling = CONSTANTS.TASHMASH_CEILINGS.MOTHER_OR_PREGNANT_32;
        break;
      case 'PREGNANT_14': 
        ceiling = CONSTANTS.TASHMASH_CEILINGS.PREGNANT_14;
        break;
      case 'STUDENT_30_PLUS': 
        ceiling = CONSTANTS.TASHMASH_CEILINGS.STUDENT_30_PLUS;
        break;
      case 'STUDENT_UNDER_30': 
        ceiling = CONSTANTS.TASHMASH_CEILINGS.STUDENT_UNDER_30;
        break;
      case 'WORKER': 
        ceiling = CONSTANTS.TASHMASH_CEILINGS.WORKER;
        break;
      case 'SOLDIER_SPOUSE': 
        ceiling = CONSTANTS.TASHMASH_CEILINGS.SOLDIER_SPOUSE;
        break;
      case 'HIGH_SCHOOL_STUDENT':
        ceiling = CONSTANTS.TASHMASH_CEILINGS.PREGNANT_14; // Same as PREGNANT_14
        break;
      case 'NEW_IMMIGRANT':
        ceiling = CONSTANTS.TASHMASH_CEILINGS.PREGNANT_14; // Same as PREGNANT_14
        break;
      default: 
        ceiling = 0;
    }
    let averageNet = 0;
    let averageGross = 0;
    if (state.incomeMethod === 'slips') {
      const calculated = calculateNetFromSlips();
      averageNet = calculated.averageNet;
      averageGross = calculated.averageGross;
    } else if (state.incomeMethod === 'manual') {
        const manualInputGross = parseFloat(state.manualIncome.gross);
        const manualInputNet = parseFloat(state.manualIncome.net);
        if (manualInputGross && manualInputNet) {
            averageGross = manualInputGross;
            averageNet = manualInputNet;
        } else if (manualInputGross) {
            averageGross = manualInputGross;
            // חישוב משוער עם הפרש של 4.27%
            averageNet = Math.round(manualInputGross * 0.9573); // 100% - 4.27% = 95.73%
        } else if (manualInputNet) {
            averageNet = manualInputNet;
            // חישוב משוער עם הפרש של 4.27%
            averageGross = Math.round(manualInputNet / 0.9573); // נטו ÷ 95.73% = ברוטו
        }
    } else if (state.incomeMethod === 'not_working') {
        averageGross = 0;
        averageNet = 0;
    }
    // Calculate savings impact early so it's available for all return paths (like car check, etc.)
    const savingsAmount = state.savings ? parseFloat(state.savings) : 0;
    let savingsImpact = 0;
    if (savingsAmount > CONSTANTS.SAVINGS_THRESHOLD) {
      const excessSavings = savingsAmount - CONSTANTS.SAVINGS_THRESHOLD;
      savingsImpact = Math.floor(excessSavings / CONSTANTS.SAVINGS_FACTOR);
    }
    // בדיקת תנאי סף לרכב
    if (state.hasCar && parseFloat(state.carValue) > CONSTANTS.CAR_MAX_VALUE) {
      return {
        eligible: false, amount: 0, averageNet, averageGross, ceiling,
        reasons: [`שווי הרכב (₪${parseFloat(state.carValue).toLocaleString('he-IL')}) גבוה מהסף המרבי (₪${CONSTANTS.CAR_MAX_VALUE.toLocaleString('he-IL')}).`],
        calculationDetails: {
          applicantType: state.applicantType,
          ceiling,
          incomeMethod: state.incomeMethod,
          averageNet,
          adjustedNet: averageNet,
          averageGross,
          deduction: 0,
          savings: savingsAmount, 
          savingsImpact: savingsImpact 
        }
      };
    }
    // אם סוג המבקש הוא 'אם לילד / הריון שבוע 32', החישוב הוא לפי מדרגות הברוטו, בתוספת השפעת חסכונות.
    if (state.applicantType === 'MOTHER_OR_PREGNANT_32') {
        const adjustedGross = averageGross + savingsImpact; // New: Incorporate savings impact into gross
        if (savingsImpact > 0) { // New: Add reason for savings impact
            reasons.push(`חסכונות מעל ₪${CONSTANTS.SAVINGS_THRESHOLD.toLocaleString('he-IL')} הוסיפו ₪${savingsImpact.toLocaleString('he-IL')} להכנסה ברוטו לצורך החישוב.`);
        }
        let tashmashAmount = 0;
        // המדרגה הראשונה היא עד CONSTANTS.MOTHER_THRESHOLDS.FULL (שעודכן ל-6655)
        if (adjustedGross <= CONSTANTS.MOTHER_THRESHOLDS.FULL) { // Changed to adjustedGross
            tashmashAmount = ceiling;
            method = "זכאות מלאה (100%)";
        } else if (adjustedGross <= CONSTANTS.MOTHER_THRESHOLDS.LEVEL_66) { // Changed to adjustedGross
            tashmashAmount = Math.round(ceiling * 0.66);
            method = "זכאות חלקית (66%)";
        } else if (adjustedGross <= CONSTANTS.MOTHER_THRESHOLDS.LEVEL_50) { // Changed to adjustedGross
            tashmashAmount = Math.round(ceiling * 0.5);
            method = "זכאות חלקית (50%)";
        } else if (adjustedGross <= CONSTANTS.MOTHER_THRESHOLDS.LEVEL_33) { // Changed to adjustedGross
            tashmashAmount = Math.round(ceiling * 0.33);
            method = "זכאות חלקית (33%)";
        } else {
            tashmashAmount = 0;
            method = "אין זכאות";
            reasons.push(`הכנסה ברוטו מתואמת (₪${adjustedGross.toLocaleString('he-IL')}) גבוהה מהסף העליון למדרגות (₪${CONSTANTS.MOTHER_THRESHOLDS.LEVEL_33.toLocaleString('he-IL')}).`); // Changed message
        }
        return {
            eligible: tashmashAmount > 0,
            amount: Math.round(tashmashAmount),
            averageNet,
            averageGross,
            ceiling,
            method,
            reasons,
            calculationDetails: {
                applicantType: state.applicantType,
                ceiling,
                incomeMethod: state.incomeMethod,
                averageNet,
                adjustedNet: averageNet + savingsImpact, // Changed to include savingsImpact
                averageGross,
                adjustedGross: adjustedGross, // New: Add adjustedGross
                deduction: 0,
                savings: savingsAmount, 
                savingsImpact: savingsImpact 
            }
        };
    }
    // בדיקת תנאי הכנסה מינימלי לעובדת (רק אם סוג המבקש הוא 'WORKER')
    if (state.applicantType === 'WORKER' && averageGross < CONSTANTS.WORKER_MIN_INCOME) {
      return {
        eligible: false, amount: 0, averageNet, averageGross, ceiling,
        reasons: [`הכנסה ברוטו (₪${averageGross.toLocaleString('he-IL')}) נמוכה מהסף המינימלי לעובדת/שאינה אם לילד (₪${CONSTANTS.WORKER_MIN_INCOME.toLocaleString('he-IL')}).`],
        calculationDetails: {
          applicantType: state.applicantType,
          ceiling,
          incomeMethod: state.incomeMethod,
          averageNet,
          adjustedNet: averageNet,
          averageGross,
          deduction: 0,
          savings: savingsAmount,
          savingsImpact: savingsImpact
        }
      };
    }
    // בדיקת תקרה ברוטו כללית - חובה לכל סוגי המבקשים (פרט לאם/הריון 32 שטופל למעלה)
    if (averageGross > CONSTANTS.MAX_CEILING) {
      return {
        eligible: false, amount: 0, averageNet, averageGross, ceiling,
        reasons: [`הכנסה ברוטו (₪${averageGross.toLocaleString('he-IL')}) גבוהה מתקרת ההכנסה המקסימלית המותרת (₪${CONSTANTS.MAX_CEILING.toLocaleString('he-IL')}).`],
        calculationDetails: {
          applicantType: state.applicantType,
          ceiling,
          incomeMethod: state.incomeMethod,
          averageNet,
          adjustedNet: averageNet,
          averageGross,
          deduction: 0,
          savings: savingsAmount,
          savingsImpact: savingsImpact
        }
      };
    }
    // התאמת הכנסה לפי חסכונות (משפיע על ההכנסה נטו לצורך החישוב)
    let adjustedNetForCalc = averageNet;
    // savingsImpact is already calculated above and available
    adjustedNetForCalc += savingsImpact;
    if (savingsImpact > 0) { 
        reasons.push(`חסכונות מעל ₪${CONSTANTS.SAVINGS_THRESHOLD.toLocaleString('he-IL')} הוסיפו ₪${savingsImpact.toLocaleString('he-IL')} להכנסה לצורך החישוב.`);
    }
    let tashmashAmount = 0;
    let deduction = 0;
    if (state.applicantType === 'STUDENT_30_PLUS') {
      if (adjustedNetForCalc <= ceiling / 4) { 
        tashmashAmount = ceiling;
        method = "זכאות מלאה (הכנסה נמוכה מ-25% מתקרת סוג המבקש)";
      } else {
        deduction = (adjustedNetForCalc - CONSTANTS.CREDIT_POINTS) * CONSTANTS.INCOME_FACTOR;
        tashmashAmount = Math.max(0, Math.min(ceiling, ceiling - deduction));
        method = "נוסחת חישוב רגילה";
        if (tashmashAmount === 0 && deduction >= ceiling) {
          reasons.push(`הכנסה מחושבת לצורך הפחתה (₪${deduction.toLocaleString('he-IL')}) שווה או גבוהה לתקרת סוג המבקש.`);
        }
      }
    } else if (state.applicantType === 'STUDENT_UNDER_30') {
      if (adjustedNetForCalc <= ceiling / 2) { 
        tashmashAmount = ceiling;
        method = "זכאות מלאה (הכנסה נמוכה מ-50% מתקרת סוג המבקש)";
      } else {
        deduction = (adjustedNetForCalc - CONSTANTS.CREDIT_POINTS) * CONSTANTS.INCOME_FACTOR;
        tashmashAmount = Math.max(0, Math.min(ceiling, ceiling - deduction));
        method = "נוסחת חישוב רגילה";
        if (tashmashAmount === 0 && deduction >= ceiling) {
          reasons.push(`הכנסה מחושבת לצורך הפחתה (₪${deduction.toLocaleString('he-IL')}) שווה או גבוהה לתקרת סוג המבקש.`);
        }
      }
    } else { // שאר סוגי המבקשים (עובדת, אשת חייל, הריון שבוע 14, תלמידת תיכון, עולה חדשה)
      deduction = (adjustedNetForCalc - CONSTANTS.CREDIT_POINTS) * CONSTANTS.INCOME_FACTOR;
      tashmashAmount = Math.max(0, Math.min(ceiling, ceiling - deduction));
      method = "נוסחת חישוב רגילה";
      if (tashmashAmount === 0 && deduction >= ceiling) {
          reasons.push(`הכנסה מחושבת לצורך הפחתה (₪${deduction.toLocaleString('he-IL')}) שווה או גבוהה לתקרת סוג המבקש.`);
      }
    }
    const finalCalculationDetails = {
        applicantType: state.applicantType,
        ceiling,
        incomeMethod: state.incomeMethod,
        averageNet: averageNet, 
        adjustedNet: adjustedNetForCalc,
        averageGross,
        deduction: deduction,
        savings: savingsAmount,
        savingsImpact: savingsImpact
    };
    return {
      eligible: tashmashAmount > 0,
      amount: Math.round(tashmashAmount),
      averageNet, 
      averageGross, 
      ceiling,
      method,
      reasons,
      calculationDetails: finalCalculationDetails
    };
  };
  // מעבר לשלב הבא
  const nextStep = () => {
    if (validateStep()) {
      if (state.currentStep === 3) {
        // חישוב תוצאות סופי
        const results = calculateTashmash();
        setState(prev => ({ ...prev, currentStep: 4, results }));
      } else {
        setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      }
    }
  };
  // מעבר לשלב ספציפי
  const goToStep = (stepNumber) => {
    // רק אם הצעד קטן או שווה לצעד הנוכחי
    if (stepNumber <= state.currentStep) {
      setState(prev => ({ ...prev, currentStep: stepNumber }));
    }
  };
  // חזרה לשלב הקודם
  const prevStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1, errors: {} }));
    }
  };
  // איפוס המחשבון
  const resetCalculator = () => {
    setState({
      currentStep: 1,
      applicantType: null,
      incomeMethod: null,
      salarySlips: [
        { gross: '', deductions: '', oneTime: '0' },
        { gross: '', deductions: '', oneTime: '0' },
        { gross: '', deductions: '', oneTime: '0' },
      ],
      manualIncome: { gross: '', net: '' },
      savings: '',
      hasCar: false,
      carValue: '',
      hasAllowances: false,
      results: null,
      errors: {},
    });
    setShowInfo(false);
    setShowInterimResults(false);
    setInterimResults(null);
  };
  // עדכון מצב האפליקציה
  const updateState = (newState) => {
    setState(prev => ({ ...prev, ...newState }));
  };
  // הצגת השלב הנוכחי
  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <ApplicantType state={state} updateState={updateState} darkMode={darkMode} nextStep={nextStep} hiddenTypes={appSettings.hiddenApplicantTypes} />;
      case 2:
        return <IncomeInput state={state} updateState={updateState} constants={CONSTANTS} darkMode={darkMode} />;
      case 3:
        return <AdditionalQuestions state={state} updateState={updateState} constants={CONSTANTS} darkMode={darkMode} />;
      case 4:
        return <Results state={state} resetCalculator={resetCalculator} constants={CONSTANTS} darkMode={darkMode} goToStep={goToStep} />;
      default:
        return null;
    }
  };
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };
  // הצגת תוצאות ביניים
  const renderInterimResults = () => {
    if (!interimResults) return null;
    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={`mb-6 p-4 rounded-lg border ${darkMode ? 'bg-[#292F36] border-[#5D6D53]' : 'bg-[#F7F4EA] border-[#C4C1A4]'}`}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className={`font-semibold ${darkMode ? 'text-[#F7F4EA]' : 'text-[#394428]'}`}>
              תוצאות ביניים לפי הנתונים הנוכחיים
            </h4>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              interimResults.eligible 
                ? darkMode ? 'bg-[#7D8F69]/20 text-[#A4BE7B]' : 'bg-[#4A593D]/20 text-[#4A593D]'
                : darkMode ? 'bg-[#BC6C25]/20 text-[#FFAA5A]' : 'bg-[#BC6C25]/20 text-[#BC6C25]'
            }`}>
              {interimResults.eligible 
                ? `₪${interimResults.amount.toLocaleString('he-IL')} לחודש`
                : 'אין זכאות'}
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className={`${darkMode ? 'text-[#F7F4EA]/80' : 'text-[#606c38]'}`}>
              <span className="font-medium">סוג מבקש:</span> {
                state.applicantType === 'MOTHER_OR_PREGNANT_32' ? 'אם לילד/אישה בהריון משבוע 32' :
                state.applicantType === 'PREGNANT_14' ? 'הריון (משבוע 14)' :
                state.applicantType === 'STUDENT_30_PLUS' ? 'סטודנטית (30+ שעות שבועיות)' :
                state.applicantType === 'STUDENT_UNDER_30' ? 'סטודנטית (16 עד 29 שעות שבועיות)' :
                state.applicantType === 'WORKER' ? 'עובדת' :
                state.applicantType === 'SOLDIER_SPOUSE' ? 'אשת חייל חיילת' :
                state.applicantType === 'HIGH_SCHOOL_STUDENT' ? 'תלמידת תיכון' :
                state.applicantType === 'NEW_IMMIGRANT' ? 'עולה חדשה' : '-'
              }
            </p>
            <p className={`${darkMode ? 'text-[#F7F4EA]/80' : 'text-[#606c38]'}`}>
              <span className="font-medium">הכנסה חודשית ממוצעת (נטו):</span> ₪{interimResults.averageNet.toLocaleString('he-IL')}
            </p>
            {interimResults.calculationDetails && interimResults.calculationDetails.savingsImpact > 0 && (
              <p className={`${darkMode ? 'text-[#F7F4EA]/80' : 'text-[#606c38]'}`}>
                <span className="font-medium">השפעת חסכונות:</span> ₪${interimResults.calculationDetails.savingsImpact.toLocaleString('he-IL')} תוספת להכנסה
              </p>
            )}
            <p className={`${darkMode ? 'text-[#F7F4EA]/80' : 'text-[#606c38]'}`}>
              <span className="font-medium">תקרת זכאות:</span> ₪{interimResults.ceiling.toLocaleString('he-IL')}
            </p>
            {interimResults.method && (
              <p className={`${darkMode ? 'text-[#F7F4EA]/80' : 'text-[#606c38]'}`}>
                <span className="font-medium">שיטת חישוב:</span> {interimResults.method}
              </p>
            )}
            {interimResults.reasons && interimResults.reasons.length > 0 && (
              <div>
                <p className={`font-medium ${darkMode ? 'text-[#F7F4EA]/80' : 'text-[#606c38]'}`}>הערות:</p>
                <ul className="list-disc list-inside">
                  {interimResults.reasons.map((reason, index) => (
                    <li key={index} className={`${darkMode ? 'text-[#F7F4EA]/70' : 'text-[#606c38]'}`}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className={`text-xs italic ${darkMode ? 'text-[#F7F4EA]/50' : 'text-[#394428]/50'}`}>
            * תוצאות אלו הן מתוך הנתונים שהוזנו עד כה. השלימו את כל הנתונים לקבלת תוצאה סופית.
          </p>
        </div>
      </motion.div>
    );
  };
  return (
    <div className="flex flex-col h-full">
      <ProgressBar steps={steps} currentStep={state.currentStep} darkMode={darkMode} onStepClick={goToStep} />
      <div className="p-4 md:p-6 flex-grow">
        {/* Info Panel */}
        <div className={`flex justify-between items-center mb-6 pb-2 border-b ${darkMode ? 'border-[#5D6D53]' : 'border-[#EAEAEA]'}`}>
          <div className="flex items-center">
            <Info className={`h-4 w-4 mr-2 ${darkMode ? 'text-[#A4BE7B]' : 'text-[#4A593D]'}`} />
            <h3 className={`text-sm ${darkMode ? 'text-[#F7F4EA]' : 'text-[#394428]'}`}>
              {STEP_INFO[`step${state.currentStep}`]?.title}
            </h3>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`text-xs px-2 py-0.5 rounded ${darkMode
              ? 'bg-[#3A3F4A] text-[#F7F4EA] hover:bg-[#4A4F5A]'
              : 'bg-[#F7F4EA] text-[#394428] hover:bg-[#EBE6D5]'}`}
          >
            {showInfo ? 'הסתר מידע' : 'הצג מידע'}
          </button>
        </div>
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                darkMode ? 'bg-[#3A3F4A] text-[#F7F4EA]' : 'bg-[#F7F4EA] text-[#394428]'
              }`}
            >
              <p className="text-sm whitespace-pre-line mobile-fix">
                {STEP_INFO[`step${state.currentStep}`]?.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" custom={state.currentStep}>
          <motion.div
            key={state.currentStep}
            custom={state.currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        {/* בלוק תוצאות ביניים - מופיע בכל שלב מלבד שלב התוצאות הסופי */}
        {state.currentStep < 4 && interimResults && (
          <div className="mt-8">
            <button
              onClick={() => setShowInterimResults(!showInterimResults)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-[#3A3F4A] border-[#5D6D53] text-[#F7F4EA]' 
                  : 'bg-[#F7F4EA] border-[#C4C1A4] text-[#394428]'
              }`}
            >
              <span className="flex items-center font-medium">
                <Info className={`h-4 w-4 mr-2 ${darkMode ? 'text-[#A4BE7B]' : 'text-[#8E9775]'}`} />
                הצג חישוב נוכחי
              </span>
              <div className={`px-3 py-1 rounded-full text-xs ${
                interimResults.eligible 
                  ? darkMode ? 'bg-[#7D8F69]/20 text-[#A4BE7B]' : 'bg-[#4A593D]/20 text-[#4A593D]'
                  : darkMode ? 'bg-[#BC6C25]/20 text-[#FFAA5A]' : 'bg-[#BC6C25]/20 text-[#BC6C25]'
              }`}>
                {interimResults.eligible 
                  ? `₪${interimResults.amount.toLocaleString('he-IL')} לחודש`
                  : 'אין זכאות'}
              </div>
            </button>
            <AnimatePresence>
              {showInterimResults && renderInterimResults()}
            </AnimatePresence>
          </div>
        )}
      </div>
      {state.currentStep < 4 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 border-t ${darkMode ? 'bg-[#232830] border-[#5D6D53]' : 'bg-[#F7F4EA]'} flex justify-between items-center`}
        >
          <div>
            {state.currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={prevStep}
                className={`flex items-center ${
                  darkMode 
                    ? 'border-[#5D6D53] text-[#F7F4EA] hover:bg-[#3A3F4A]'
                    : 'border-[#8E9775] text-[#394428] hover:bg-[#EBE6D5]'
                }`}
              >
                <ArrowRight className="h-4 w-4 ml-1" />
                חזרה
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost"
              onClick={resetCalculator}
              className={
                darkMode 
                  ? 'text-[#A4BE7B] hover:text-[#A4BE7B] hover:bg-[#3A3F4A]'
                  : 'text-[#8E9775] hover:text-[#4A593D] hover:bg-[#EBE6D5]'
              }
            >
              <RefreshCw className="h-4 w-4 ml-1" />
              איפוס
            </Button>
            <Button 
              onClick={nextStep}
              className={`bg-[#4A593D] hover:bg-[#8E9775] text-[#F7F4EA]`}
            >
              {state.currentStep === 3 ? 'חשב זכאות' : 'המשך'}
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
import React from 'react';
import { Button } from "@/components/ui/button";
import { BabyIcon, Heart, GraduationCap, Briefcase, Shield, School, Globe } from "lucide-react";
import { motion } from "framer-motion";
// תיאור עבור כל סוג מבקש - סדר מעודכן
export const applicantTypeInfo = {
  MOTHER_OR_PREGNANT_32: {
    title: "אם לילד / הריון (משבוע 32)",
    icon: BabyIcon,
    description: "תקרה: ₪6,655"
  },
  PREGNANT_14: {
    title: "הריון (משבוע 14)",
    icon: Heart,
    description: "תקרה: ₪5,324"
  },
  WORKER: {
    title: "עובדת/שאינה אם לילד",
    icon: Briefcase,
    description: "תקרה: ₪5,324"
  },
  STUDENT_30_PLUS: {
    title: "סטודנטית (30+ שעות שבועיות)",
    icon: GraduationCap,
    description: "תקרה: ₪4,992"
  },
  STUDENT_UNDER_30: {
    title: "סטודנטית (16-29 שעות שבועיות)",
    icon: GraduationCap,
    description: "תקרה: ₪3,328"
  },
  HIGH_SCHOOL_STUDENT: {
    title: "לומדת בתיכון / קורס מקצועי (35+ שע' שבוע')",
    icon: School,
    description: "תקרה: ₪5,324"
  },
  NEW_IMMIGRANT: {
    title: "עולה חדשה",
    icon: Globe,
    description: "תקרה: ₪5,324"
  },
  SOLDIER_SPOUSE: {
    title: "אשת חייל שהיא חיילת / משרתת בשירות לאומי",
    icon: Shield,
    description: "תקרה: ₪4,992"
  }
};
// Animation variants for staggered animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
export default function ApplicantType({ state, updateState, darkMode, nextStep, hiddenTypes = [] }) {
  // Filter out hidden types
  const visibleApplicantTypes = Object.entries(applicantTypeInfo).filter(
    ([type]) => !hiddenTypes.includes(type)
  );
  const handleApplicantTypeSelect = (type) => {
    updateState({ 
      applicantType: type,
      errors: {} 
    });
    setTimeout(() => nextStep(), 100); 
  };
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-[#F7F4EA]' : 'text-[#394428]'}`}>
          בחירת סוג מבקש
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-[#F7F4EA]/80' : 'text-[#606c38]'}`}>
          המידע הבא יעזור לנו לחשב את זכאותך בהתאם לקטגוריה המתאימה
        </p>
      </motion.div>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {visibleApplicantTypes.map(([type, info]) => {
          const Icon = info.icon;
          const isSelected = state.applicantType === type;
          return (
            <motion.div
              key={type}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className={`h-auto w-full flex items-center justify-between p-4 transition-all rounded-xl ${
                  isSelected
                    ? (darkMode 
                        ? "border-[#7D8F69] bg-[#3A3F4A] text-[#F7F4EA]"
                        : "border-[#4A593D] bg-[#F7F4EA] text-[#394428]")
                    : (darkMode 
                        ? "border-[#5D6D53] hover:border-[#7D8F69] hover:bg-[#3A3F4A]/80 text-[#F7F4EA]"
                        : "border-[#C4C1A4] hover:border-[#8E9775] hover:bg-[#F7F4EA]/50 text-[#394428]")
                }`}
                onClick={() => handleApplicantTypeSelect(type)}
              >
                <div className={`p-3 rounded-full shrink-0 mr-3 ${
                  isSelected
                    ? (darkMode 
                        ? "bg-[#5D6D53]/50 text-[#A4BE7B]"
                        : "bg-[#C4C1A4]/30 text-[#394428]")
                    : ""
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0 text-right break-word-fix">
                  <div className="font-medium text-xs md:text-sm mobile-fix leading-tight">{info.title}</div>
                  <div className={`text-xs ${darkMode ? 'text-[#F7F4EA]/70' : 'text-[#606c38]'}`}>
                    {info.description}
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Receipt, Pen, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
export default function IncomeInput({ state, updateState, constants, darkMode }) {
  const setIncomeMethod = (method) => {
    updateState({
        incomeMethod: method,
        errors: {},
        salarySlips: method !== 'slips' ? [ { gross: '', deductions: '', oneTime: '0' }, { gross: '', deductions: '', oneTime: '0' }, { gross: '0', deductions: '0', oneTime: '0' } ] : state.salarySlips,
        manualIncome: method !== 'manual' ? { gross: '', net: '' } : state.manualIncome,
    });
  };
  // Student marriage date question handlers
  const handleMarriageAfterFirstYear = (answer) => {
    updateState({
      marriageAfterFirstYear: answer,
      errors: {}
    });
  };
  const updateSalarySlip = (index, field, value) => {
    const newSlips = [...state.salarySlips];
    newSlips[index] = { ...newSlips[index], [field]: value };
    updateState({
      salarySlips: newSlips,
      errors: { ...state.errors, slips: null }
    });
  };
  const updateManualIncome = (field, value) => {
    updateState({
      manualIncome: {
        ...state.manualIncome,
        [field]: value,
      },
      errors: { ...state.errors, manualGross: null, manualNet: null, manualIncome: null }
    });
  };
  // פונקציות החישוב המשוער עם הפרש של 4.27%
  const calculateNetFromGrossApprox = (gross) => {
    if (!gross || isNaN(gross) || parseFloat(gross) <= 0) return '';
    return Math.round(parseFloat(gross) * 0.9573).toString(); // 100% - 4.27% = 95.73%
  };
  const calculateGrossFromNetApprox = (net) => {
    if (!net || isNaN(net) || parseFloat(net) <= 0) return '';
    return Math.round(parseFloat(net) / 0.9573).toString(); // נטו ÷ 95.73% = ברוטו
  };
  const calculateNet = (slip) => {
    const gross = parseFloat(slip.gross) || 0;
    const deductions = parseFloat(slip.deductions) || 0;
    const oneTime = parseFloat(slip.oneTime) || 0;
    return gross - deductions - oneTime;
  };
  const calculateAverages = () => {
    let totalGross = 0;
    let totalNet = 0;
    let validMonths = 0;
    state.salarySlips.forEach(slip => {
      if (slip.gross && !isNaN(slip.gross)) {
        const gross = parseFloat(slip.gross);
        const net = calculateNet(slip);
        totalGross += gross;
        totalNet += net;
        validMonths++;
      }
    });
    return {
      averageGross: validMonths > 0 ? totalGross / validMonths : 0,
      averageNet: validMonths > 0 ? totalNet / validMonths : 0,
    };
  };
  const averages = calculateAverages();
  const manualGross = state.manualIncome?.gross || '';
  const manualNet = state.manualIncome?.net || '';
  const canSelectNotWorking = !['WORKER', 'SOLDIER_SPOUSE'].includes(state.applicantType);
  // Check if this is a student type
  const isStudentType = state.applicantType === 'STUDENT_30_PLUS' || state.applicantType === 'STUDENT_UNDER_30';
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-[var(--foreground)]' : 'text-gray-900'}`}>
          הזנת נתוני הכנסה
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-600'} max-w-xl mx-auto`}>
          הכנסות אלו יעזרו לנו לחשב את זכאותך לתשמש.
        </p>
      </motion.div>
      {/* Student marriage date question */}
      <AnimatePresence>
        {isStudentType && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="!mt-4"
          >
            <Card className={`shadow-sm border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : 'border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`text-lg ${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>
                  שאלת זכאות
                </CardTitle>
                <CardDescription className={`${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-600'}`}>
                  בסוג משתמש זה חובה שהחתונה תהיה לאחר סיום שנה א' ללימודים.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={`font-medium ${darkMode ? 'text-[var(--foreground)]' : 'text-gray-900'}`}>
                  האם התחתנתם לאחר סיום שנה א' ללימודים?
                </p>
                <div className="flex gap-4">
                  <Button
                    variant={state.marriageAfterFirstYear === true ? "default" : "outline"}
                    onClick={() => handleMarriageAfterFirstYear(true)}
                    className={`flex-1 ${darkMode ? 'border-[var(--border)]' : 'border-gray-300'}`}
                  >
                    כן
                  </Button>
                  <Button
                    variant={state.marriageAfterFirstYear === false ? "default" : "outline"}
                    onClick={() => handleMarriageAfterFirstYear(false)}
                    className={`flex-1 ${darkMode ? 'border-[var(--border)]' : 'border-gray-300'}`}
                  >
                    לא
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Not eligible message for students who married before completing first year */}
      <AnimatePresence>
        {isStudentType && state.marriageAfterFirstYear === false && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="!mt-4"
          >
            <Alert variant="destructive" className={`bg-[var(--destructive)]/10 border-[var(--destructive)] text-[var(--destructive)]`}>
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-semibold">אין זכאות</div>
                  <div>מאחר שהחתונה נערכה לפני סיום שנה א' ללימודים, אין זכאות לסיוע במסלול זה.</div>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Only show income input if not a student or if student answered yes to marriage question */}
      <AnimatePresence>
        {(!isStudentType || state.marriageAfterFirstYear === true) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-6"
          >
            <AnimatePresence>
              {state.applicantType === 'NEW_IMMIGRANT' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="!mt-4"
                  >
                    <Alert className={`${darkMode ? 'bg-blue-900/30 border-blue-500/50 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        שימו לב: הזכאות לסיוע תלויה בהצגת אישור מאולפן ואישור עולה במעמד ההגשה.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
              )}
            </AnimatePresence>
            {/* בדיקה אם המשתמש בחר 'עובדת' לצורך הצגת התראה מתאימה */}
            <AnimatePresence>
              {state.applicantType === 'WORKER' && state.incomeMethod === 'not_working' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="!mt-4"
                >
                  <Alert variant="destructive" className={`bg-[var(--destructive)]/10 border-[var(--destructive)] text-[var(--destructive)]`}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      שים/י לב: סוג המבקש "עובדת/שאינה אם לילד" דורש הכנסה מינימלית. בחירה ב"לא עובדת" תשלול זכאות במקרה זה.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            {state.errors.incomeMethod && (
              <Alert variant="destructive" className={`bg-[var(--destructive)]/10 border-[var(--destructive)] text-[var(--destructive)]`}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.errors.incomeMethod}</AlertDescription>
              </Alert>
            )}
            <Tabs
              value={state.incomeMethod || ""}
              onValueChange={setIncomeMethod}
              className="w-full"
            >
              <TabsList className={`grid ${canSelectNotWorking ? 'grid-cols-3' : 'grid-cols-2'} mb-6 rounded-lg ${darkMode ? 'bg-[var(--secondary)]' : 'bg-gray-100'}`}>
                <TabsTrigger
                  value="slips"
                  className={`flex gap-2 items-center py-2.5 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--primary-foreground)] ${darkMode ? 'text-[var(--foreground)] hover:bg-[var(--muted)]' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  <Receipt className="h-4 w-4" />
                  <span className="hidden sm:inline">תלושי שכר</span>
                  <span className="sm:hidden">תלושים</span>
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className={`flex gap-2 items-center py-2.5 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--primary-foreground)] ${darkMode ? 'text-[var(--foreground)] hover:bg-[var(--muted)]' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  <Pen className="h-4 w-4" />
                  <span className="hidden sm:inline">הכנסה משוערת</span>
                  <span className="sm:hidden">משוער</span>
                </TabsTrigger>
                {canSelectNotWorking && (
                  <TabsTrigger
                    value="not_working"
                    className={`flex gap-2 items-center py-2.5 data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--primary-foreground)] ${darkMode ? 'text-[var(--foreground)] hover:bg-[var(--muted)]' : 'text-gray-700 hover:bg-gray-200'}`}
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">לא עובדת</span>
                    <span className="sm:hidden">ללא עבודה</span>
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="slips" className="space-y-6">
                  {state.errors.slips && (
                      <Alert variant="destructive" className={`bg-[var(--destructive)]/10 border-[var(--destructive)] text-[var(--destructive)]`}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{state.errors.slips}</AlertDescription>
                      </Alert>
                  )}
                   <div className="space-y-6">
                      {state.salarySlips.map((slip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className={`shadow-sm border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : (slip.gross ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200')} transition-all hover-card`}>
                            <CardHeader className="pb-3">
                              <CardTitle className={`flex justify-between items-center ${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>
                                <span>תלוש {index + 1}</span>
                                {slip.gross && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-[var(--muted)] text-[var(--muted-foreground)]' : 'bg-indigo-100 text-indigo-800'}`}
                                  >
                                    נטו: ₪{calculateNet(slip).toLocaleString('he-IL')}
                                  </motion.span>
                                )}
                              </CardTitle>
                              <CardDescription className={`${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-500'}`}>
                                  יש להזין את השדות הרלוונטיים מתלוש השכר. ניכויי חובה כוללים: ביטוח לאומי, מס הכנסה ומס בריאות.
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`gross-${index}`} className={`${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>
                                  ברוטו <span className="text-[var(--destructive)]">*</span>
                                </Label>
                                <div className="input-wrapper">
                                  <Input
                                    id={`gross-${index}`} type="number" min="0" max={constants.MAX_INPUT} placeholder="הכנסה ברוטו" value={slip.gross}
                                    onChange={(e) => updateSalarySlip(index, 'gross', e.target.value)}
                                    className={`input-with-prefix ${state.errors[`gross_${index}`] ? "border-[var(--destructive)]" : "border-[var(--input-border)]"}`}
                                  />
                                  <span className="input-prefix">₪</span>
                                </div>
                                {state.errors[`gross_${index}`] && (<p className="text-sm text-[var(--destructive)]">{state.errors[`gross_${index}`]}</p>)}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`deductions-${index}`} className={`${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>ניכויי חובה</Label>
                                <div className="input-wrapper">
                                  <Input
                                    id={`deductions-${index}`} type="number" min="0" max={slip.gross || constants.MAX_INPUT} placeholder="ביטוח לאומי, מס הכנסה ומס בריאות" value={slip.deductions}
                                    onChange={(e) => updateSalarySlip(index, 'deductions', e.target.value)}
                                    className={`input-with-prefix ${state.errors[`deductions_${index}`] ? "border-[var(--destructive)]" : "border-[var(--input-border)]"}`}
                                  />
                                  <span className="input-prefix">₪</span>
                                </div>
                                {state.errors[`deductions_${index}`] && (<p className="text-sm text-[var(--destructive)]">{state.errors[`deductions_${index}`]}</p>)}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`oneTime-${index}`} className={`${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>תשלומים חד-פעמיים</Label>
                                <div className="input-wrapper">
                                  <Input
                                    id={`oneTime-${index}`} type="number" min="0" max={constants.MAX_INPUT} placeholder="בונוסים, הפרשי שכר וכו׳" value={slip.oneTime}
                                    onChange={(e) => updateSalarySlip(index, 'oneTime', e.target.value)}
                                    className={`input-with-prefix ${state.errors[`oneTime_${index}`] ? "border-[var(--destructive)]" : "border-[var(--input-border)]"}`}
                                  />
                                  <span className="input-prefix">₪</span>
                                </div>
                                {state.errors[`oneTime_${index}`] && (<p className="text-sm text-[var(--destructive)]">{state.errors[`oneTime_${index}`]}</p>)}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                  {state.salarySlips.some(slip => slip.gross) && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className={`border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : 'bg-gray-50 border-gray-200'}`}>
                          <CardHeader>
                            <CardTitle className={`${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>סיכום ממוצע חודשי</CardTitle>
                          </CardHeader>
                          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-500'}`}>ברוטו ממוצע:</p>
                              <p className={`text-xl font-bold ${darkMode ? 'text-[var(--foreground)]' : 'text-gray-900'}`}>₪{averages.averageGross.toLocaleString('he-IL')}</p>
                            </div>
                            <div>
                              <p className={`text-sm ${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-500'}`}>נטו ממוצע:</p>
                              <p className={`text-xl font-bold ${darkMode ? 'text-[var(--foreground)]' : 'text-gray-900'}`}>₪{averages.averageNet.toLocaleString('he-IL')}</p>
                            </div>
                          </CardContent>
                          {state.errors.slips && state.applicantType === 'WORKER' && (
                             <CardFooter className={`${darkMode ? 'bg-[var(--destructive)]/10 border-t border-[var(--destructive)]' : 'bg-red-50 border-t border-red-100'}`}>
                               <Alert variant="destructive" className="border-0 bg-transparent">
                                 <AlertCircle className="h-4 w-4 text-[var(--destructive)]" />
                                 <AlertDescription className="text-[var(--destructive)]">{state.errors.slips}</AlertDescription>
                               </Alert>
                             </CardFooter>
                          )}
                        </Card>
                      </motion.div>
                  )}
              </TabsContent>
              <TabsContent value="manual" className="space-y-6">
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <Card className={`shadow-sm border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : 'border-gray-200'} hover-card`}>
                        <CardHeader>
                          <CardTitle className={`${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>הכנסה חודשית משוערת</CardTitle>
                          <CardDescription className={`${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-500'}`}>
                            הזינו הכנסה ברוטו או נטו. אם תזינו רק אחד מהם, המערכת תשתמש בו לחישוב משוער (הפרש 4.27%). אם תזינו את שניהם, המערכת תשתמש בערכים שהוזנו.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="manual-gross" className={`text-base ${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>
                              הכנסה חודשית ברוטו
                            </Label>
                            <div className="input-wrapper">
                              <Input
                                id="manual-gross" type="number" min="0" max={constants.MAX_INPUT} placeholder="הכנסה חודשית ברוטו" value={manualGross}
                                onChange={(e) => updateManualIncome('gross', e.target.value)}
                                className={`input-with-prefix ${state.errors.manualGross ? "border-[var(--destructive)]" : "border-[var(--input-border)]"}`}
                              />
                              <span className="input-prefix">₪</span>
                            </div>
                            {state.errors.manualGross && (<p className="text-sm text-[var(--destructive)]">{state.errors.manualGross}</p>)}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="manual-net" className={`text-base ${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>
                              הכנסה חודשית נטו
                            </Label>
                            <div className="input-wrapper">
                              <Input
                                id="manual-net" type="number" min="0" max={constants.MAX_INPUT} placeholder="הכנסה חודשית נטו" value={manualNet}
                                onChange={(e) => updateManualIncome('net', e.target.value)}
                                className={`input-with-prefix ${state.errors.manualNet ? "border-[var(--destructive)]" : "border-[var(--input-border)]"}`}
                              />
                              <span className="input-prefix">₪</span>
                            </div>
                            {state.errors.manualNet && (<p className="text-sm text-[var(--destructive)]">{state.errors.manualNet}</p>)}
                          </div>
                        </CardContent>
                        {(state.errors.manualIncome || (state.applicantType === 'WORKER' && state.errors.manualGross)) && (
                          <CardFooter className={`${darkMode ? 'bg-[var(--destructive)]/10 border-t border-[var(--destructive)]' : 'bg-red-50 border-t border-red-100'}`}>
                            <Alert variant="destructive" className="border-0 bg-transparent">
                              <AlertCircle className="h-4 w-4 text-[var(--destructive)]" />
                              <AlertDescription className="text-[var(--destructive)]">{state.errors.manualIncome || state.errors.manualGross}</AlertDescription>
                            </Alert>
                          </CardFooter>
                        )}
                      </Card>
                  </motion.div>
              </TabsContent>
              {canSelectNotWorking && (
                <TabsContent value="not_working">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className={`shadow-sm border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : 'border-gray-200'} hover-card`}>
                      <CardHeader>
                        <CardTitle className={`${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>אינני עובדת כרגע</CardTitle>
                        <CardDescription className={`${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-500'}`}>
                          בבחירה זו, ההכנסה שלך תחושב כ-0 לצורך בדיקת הזכאות.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                         {(state.applicantType === 'WORKER') && (
                           <Alert className={`${darkMode ? 'bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]' : 'bg-blue-50 border-blue-200 text-blue-900'}`}>
                             <AlertCircle className={`h-4 w-4 ${darkMode ? 'text-[var(--accent)]' : 'text-blue-500'}`} />
                             <AlertDescription>
                               שים/י לב: סוג המבקש "עובדת/שאינה אם לילד" דורש הכנסה מינימלית. בחירה ב"לא עובדת" תשלול זכאות במקרה זה.
                             </AlertDescription>
                           </Alert>
                         )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              )}
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, PiggyBank, Car, HandCoins } from "lucide-react"; // Added HandCoins
import { motion } from "framer-motion";
export default function AdditionalQuestions({ state, updateState, constants, darkMode }) {
  const handleSavingsChange = (value) => {
    updateState({
      savings: value,
    });
  };
  const handleHasCarChange = (checked) => {
    updateState({
      hasCar: checked,
      carValue: checked ? state.carValue : '',
    });
  };
  const handleCarValueChange = (value) => {
    updateState({
      carValue: value,
    });
  };
  const handleHasAllowancesChange = (checked) => {
    updateState({
      hasAllowances: checked,
    });
  };
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-[var(--foreground)]' : 'text-gray-900'}`}>
          שאלות נוספות
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-600'}`}>
          מידע נוסף זה יכול להשפיע על זכאותך
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className={`shadow-sm border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : 'border-gray-200'} hover-card`}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`p-2 rounded-full ${darkMode ? 'bg-[var(--muted)]' : 'bg-blue-100'}`}>
                <PiggyBank className={`h-5 w-5 ${darkMode ? 'text-[var(--accent)]' : 'text-blue-700'}`} />
              </div>
              <CardTitle className={`${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>חסכונות</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="savings" className={`${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>סכום חסכונות כולל</Label>
                  <div className="input-wrapper">
                    <Input
                      id="savings" type="number" min="0" max={constants.MAX_SAVINGS} placeholder="סכום החסכונות" value={state.savings}
                      onChange={(e) => handleSavingsChange(e.target.value)}
                      className={`input-with-prefix ${state.errors.savings ? "border-[var(--destructive)]" : "border-[var(--input-border)]"}`}
                    />
                    <span className="input-prefix">₪</span>
                  </div>
                  {state.errors.savings && (<p className="text-sm text-[var(--destructive)]">{state.errors.savings}</p>)}
                </div>
                {state.savings && parseFloat(state.savings) > constants.SAVINGS_THRESHOLD && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                    <Alert className={`${darkMode ? 'bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                      <AlertCircle className={`h-4 w-4 ${darkMode ? 'text-[var(--accent)]' : 'text-amber-500'}`} />
                      <AlertDescription>
                        חסכונות מעל ₪{constants.SAVINGS_THRESHOLD.toLocaleString('he-IL')} ישפיעו על חישוב הזכאות
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className={`shadow-sm border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : 'border-gray-200'} hover-card`}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`p-2 rounded-full ${darkMode ? 'bg-[var(--muted)]' : 'bg-green-100'}`}>
                <Car className={`h-5 w-5 ${darkMode ? 'text-[var(--accent)]' : 'text-green-700'}`} />
              </div>
              <CardTitle className={`${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>רכב</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="car-switch" className={`${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>האם יש בבעלותך רכב?</Label>
                  <Switch
                    id="car-switch" 
                    checked={state.hasCar} 
                    onCheckedChange={handleHasCarChange}
                    className={`
                      data-[state=checked]:bg-[var(--primary)] 
                      ${darkMode ? 'data-[state=unchecked]:bg-[#5D6D53]' : 'data-[state=unchecked]:bg-gray-200'}
                      border-2 border-transparent
                    `}
                  />
                </div>
                {state.hasCar && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-2">
                    <Label htmlFor="car-value" className={`${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>שווי הרכב (רכב אחד בלבד)</Label>
                    <div className="input-wrapper">
                      <Input
                        id="car-value" type="number" min="0" max={constants.MAX_INPUT} placeholder="שווי הרכב" value={state.carValue}
                        onChange={(e) => handleCarValueChange(e.target.value)}
                        className={`input-with-prefix ${state.errors.carValue ? "border-[var(--destructive)]" : "border-[var(--input-border)]"}`}
                      />
                      <span className="input-prefix">₪</span>
                    </div>
                    {state.errors.carValue && (<p className="text-sm text-[var(--destructive)]">{state.errors.carValue}</p>)}
                    <p className={`text-xs ${darkMode ? 'text-[var(--muted-foreground)]' : 'text-gray-500'}`}>
                      הערה: בעלות על יותר מרכב אחד עלולה לשלול את הזכאות לתשמש, גם אם סכום השווי נמוך מהסף.
                    </p>
                    {state.carValue && parseFloat(state.carValue) > constants.CAR_MAX_VALUE && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                        <Alert variant="destructive" className={`mt-2 bg-[var(--destructive)]/10 border-[var(--destructive)] text-[var(--destructive)]`}>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            רכב בשווי מעל ₪{constants.CAR_MAX_VALUE.toLocaleString('he-IL')} אינו מאפשר זכאות לתשמש
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className={`shadow-sm border ${darkMode ? 'bg-[var(--card-background)] border-[var(--border)]' : 'border-gray-200'} hover-card`}>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-[var(--muted)]' : 'bg-yellow-100'}`}>
              <HandCoins className={`h-5 w-5 ${darkMode ? 'text-[var(--accent)]' : 'text-yellow-700'}`} />
            </div>
            <CardTitle className={`${darkMode ? 'text-[var(--card-foreground)]' : 'text-gray-900'}`}>קצבאות מביטוח לאומי</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="allowances-switch" className={`${darkMode ? 'text-[var(--foreground)]' : 'text-gray-700'}`}>האם יש הכנסה מקצבאות?</Label>
                <Switch
                  id="allowances-switch" 
                  checked={state.hasAllowances} 
                  onCheckedChange={handleHasAllowancesChange}
                  className={`
                    data-[state=checked]:bg-[var(--primary)] 
                    ${darkMode ? 'data-[state=unchecked]:bg-[#5D6D53]' : 'data-[state=unchecked]:bg-gray-200'}
                    border-2 border-transparent
                  `}
                />
              </div>
              {state.hasAllowances && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                  <Alert className={`${darkMode ? 'bg-[var(--muted)] border-[var(--border)] text-[var(--muted-foreground)]' : 'bg-yellow-50 border-yellow-200 text-yellow-900'}`}>
                    <AlertCircle className={`h-4 w-4 ${darkMode ? 'text-[var(--accent)]' : 'text-yellow-500'}`} />
                    <AlertDescription>
                      שימו לב: הכנסה מקצבאות יכולה לשנות את תנאי הזכאות לתשמ״ש.
                      המחשבון עדיין בפיתוח ואנו מקווים להוסיף את רכיב החישוב הזה בקרוב.
                      אם יש לכם הכנסה מקצבה, ייתכן שתוצאת הזכאות כעת אינה מדויקה.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}