'use server'

import { db } from '@/server/db'; // Your database client

// Fetch students or filter by name or ID
export async function getStudents(search: string = "") {
  const students = await db.student.findMany({
    where: {
      OR: [
        { name: { contains: search } },
        { id: { contains: search } },
      ],
    },
  });
  return students;
}

// Register a new student
export async function createStudent(data: { name: string; id: string }) {
  const { name, id } = data;
  if (!name || !id) {
    throw new Error("Name and ID are required");
  }
  const newStudent = await db.student.create({ data });
  return newStudent;
}

// Register attendance
export async function registerAttendance(data: {
  semester: string;
  course: string;
  lectureNumber: string;
  doctorEnteringTime: string;
  students: { id: string; isPresent: boolean }[];
  description?: string;
}) {
  const { semester, course, lectureNumber, doctorEnteringTime, students, description } = data;

  if (!semester || !course || !lectureNumber || !doctorEnteringTime || !Array.isArray(students)) {
    throw new Error("All fields are required");
  }

  // Create attendance records for each student
  const attendanceRecords = await Promise.all(
    students.map(async (student) => {
      const studentRecord = await db.student.findUnique({
        where: { id: student.id },
      });

      if (!studentRecord) {
        throw new Error(`Student with ID ${student.id} not found`);
      }

      return db.attendance.create({
        data: {
          student: { connect: { id: studentRecord.id } },
          course,
          semester,
          lectureNumber: parseInt(lectureNumber, 10),
          doctorEnteringTime,
          isPresent: student.isPresent,
          description,
        },
      });
    })
  );

  return attendanceRecords;
}

// Fetch attendance records
export async function getAttendance(data: {
  semester?: string;
  course?: string;
  lectureNumber?: string;
}) {
  const { semester, course, lectureNumber } = data;

  const attendanceRecords = await db.attendance.findMany({
    where: {
      AND: [
        semester ? { semester } : {},
        course ? { course } : {},
        lectureNumber ? { lectureNumber: parseInt(lectureNumber, 10) } : {},
      ],
    },
    include: {
      student: true,
    },
  });

  return attendanceRecords;
}
