import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type BookingRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  meetingMode: string;
  topic: string;
  message: string;
  status: "new";
  createdAt: string;
};

export type BookingRequestInput = Omit<BookingRequest, "id" | "status" | "createdAt">;

const bookingFilePath = path.join(process.cwd(), "data", "booking-requests.json");

async function ensureStorageFile() {
  await mkdir(path.dirname(bookingFilePath), { recursive: true });

  try {
    await readFile(bookingFilePath, "utf8");
  } catch (error) {
    const errorWithCode = error as { code?: unknown } | null;
    const errorCode = errorWithCode?.code ? String(errorWithCode.code) : "";
    if (errorCode === "ENOENT") {
      await writeFile(bookingFilePath, "[]\n", "utf8");
      return;
    }

    throw error;
  }
}

export async function readBookingRequests() {
  await ensureStorageFile();

  try {
    const fileContents = await readFile(bookingFilePath, "utf8");
    const bookings = JSON.parse(fileContents) as BookingRequest[];

    if (!Array.isArray(bookings)) {
      return [];
    }

    return bookings
      .filter(Boolean)
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
  } catch {
    return [];
  }
}

export async function createBookingRequest(input: BookingRequestInput) {
  const bookings = await readBookingRequests();
  const booking: BookingRequest = {
    ...input,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };

  await writeFile(bookingFilePath, `${JSON.stringify([booking, ...bookings], null, 2)}\n`, "utf8");

  return booking;
}
