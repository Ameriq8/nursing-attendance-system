'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { getStudents, registerAttendance } from '@/app/actions';

type Student = {
  id: string;
  name: string;
  isPresent: boolean;
};

// Check if prefixTokens is a prefix of studentTokens
function isPrefixMatch(prefixTokens: string[], studentTokens: string[]): boolean {
  if (prefixTokens.length > studentTokens.length) return false;
  for (let i = 0; i < prefixTokens.length; i++) {
    if (prefixTokens[i] !== studentTokens[i]) {
      return false;
    }
  }
  return true;
}

export default function RegisterAttendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [inputStudents, setInputStudents] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [lectureNumber, setLectureNumber] = useState('1');
  const [doctorEnteringTime, setDoctorEnteringTime] = useState('08:00');
  const [displayStudents, setDisplayStudents] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      const allStudents = (await getStudents()).map((student) => ({
        ...student,
        isPresent: false,
      })) as Student[];
      setStudents(allStudents);
    };
    void fetchStudents();<s></s>
  }, []);

  // Parse user input into an array of prefix-queries
  const parseInputPrefixes = (): string[][] => {
    const lines = inputStudents
      .split(/[\n,]+/)
      .map((line) => line.trim())
      .filter(Boolean);
    return lines.map((line) =>
      line
        .split(/\s+/)
        .map((token) => token.toLowerCase())
        .filter(Boolean),
    );
  };

  // Main logic to mark attendance based on prefix matching
  const handleRegisterAttendance = () => {
    const prefixes = parseInputPrefixes();
    if (prefixes.length === 0) {
      setStudents(
        students.map((s) => ({
          ...s,
          isPresent: false,
        })),
      );
      return;
    }

    const updatedStudents = students.map((student) => {
      const studentTokens = student.name.split(/\s+/).map((t) => t.toLowerCase());
      const matched = prefixes.some((prefixTokens) => isPrefixMatch(prefixTokens, studentTokens));
      return { ...student, isPresent: matched };
    });

    updatedStudents.sort((a, b) => {
      if (a.isPresent === b.isPresent) {
        return a.name.localeCompare(b.name, 'ar');
      }
      return a.isPresent ? -1 : 1;
    });

    setStudents(updatedStudents);
  };

  // Handle changes to lecture number
  const handleLectureChange = (value: string) => {
    setLectureNumber(value);
    const times: Record<string, string> = {
      '1': '08:00',
      '2': '10:00',
      '3': '13:00',
      '4': '15:00',
    };
    setDoctorEnteringTime(times[value] ?? '08:00');
  };

  // Toggle a student's attendance using the 'checked' value from Switch
  const toggleAttendance = (index: number, checked: boolean) => {
    setStudents((prev) => {
      const newList = [...prev];
      newList[index]!.isPresent = checked;
      return newList;
    });
  };

  const presentStudents = students.filter((s) => s.isPresent).map((s) => s.name);
  const absentStudents = students.filter((s) => !s.isPresent).map((s) => s.name);

  const reportContent = `
📝 تقرير حضور المحاضرة
-----------------------------------
المادة: ${course} - المحاضرة ${lectureNumber}
حضور الدكتور: الساعة ${doctorEnteringTime}
-----------------------------------
👥 الطلاب الحضور:
${presentStudents.join('\n')}
-----------------------------------
⏳ الطلاب المتأخرين:

-----------------------------------
😶‍🌫️ الطلاب الغائبين:
${absentStudents.join('\n')}
-----------------------------------
  `.trim();

  const copyToClipboard = async () => {
    handleRegisterAttendance();
    try {
      await navigator.clipboard.writeText(reportContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Register Student Attendance</CardTitle>
          <CardDescription>
            Enter complex names (e.g., <code>عبد الله</code>, <code>عبد الحسين</code>) on one line,
            or separate multiple prefixes by commas/newlines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Enter semester"
              />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter course"
              />
            </div>
            <div>
              <Label htmlFor="lectureNumber">Lecture Number</Label>
              <Input
                id="lectureNumber"
                type="number"
                min="1"
                max="4"
                value={lectureNumber}
                onChange={(e) => handleLectureChange(e.target.value)}
                placeholder="Enter lecture number (1-4)"
              />
            </div>
            <div>
              <Label htmlFor="doctorEnteringTime">Doctor Entering Time</Label>
              <Input
                id="doctorEnteringTime"
                type="time"
                value={doctorEnteringTime}
                onChange={(e) => setDoctorEnteringTime(e.target.value)}
                placeholder="Doctor entering time"
              />
            </div>
            <div>
              <Label htmlFor="inputStudents">Complex Names (Comma or Newline Separated)</Label>
              <textarea
                id="inputStudents"
                value={inputStudents}
                onChange={(e) => setInputStudents(e.target.value)}
                placeholder={`Examples:\nعبد الله\nعبد الحسين, محمد نعمة`}
                className="w-full border rounded-md p-2"
                rows={4}
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={handleRegisterAttendance}>Register Attendance</Button>
              <Button
                className="bg-blue-500 hover:bg-blue-500/90"
                onClick={() => setDisplayStudents((prev) => !prev)}
              >
                {displayStudents ? 'Hide Students' : 'Show Students'}
              </Button>
            </div>
          </div>

          {/* Show Table if students are to be displayed */}
          {students.length > 0 && displayStudents && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell className="text-sm">{student.name}</TableCell>
                    <TableCell className="text-sm flex items-center">
                      <Switch
                        checked={student.isPresent}
                        onCheckedChange={(val) => toggleAttendance(index, val)}
                        aria-label={`Toggle attendance for ${student.name}`}
                      />
                      <span className="ml-2">{student.isPresent ? 'Present' : 'Absent'}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
          {isCopied && <span className="text-green-500">Copied to clipboard!</span>}
          <Button
            onClick={async () => {
              if (!semester || !course || !lectureNumber || students.length === 0) {
                alert('Please fill all fields and ensure at least one student is present.');
                return;
              }
              try {
                handleRegisterAttendance();
                await registerAttendance({
                  semester,
                  course,
                  lectureNumber,
                  doctorEnteringTime,
                  students,
                  description: `Attendance for lecture ${lectureNumber}`,
                });
                alert('Attendance has been successfully registered.');
                void copyToClipboard();
              } catch (error) {
                console.error('Error registering attendance:', error);
                alert('Failed to register attendance.');
              }
            }}
          >
            Save Attendance
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
