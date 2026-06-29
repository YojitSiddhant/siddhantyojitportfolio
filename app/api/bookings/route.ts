import { createBookingRequest, type BookingRequestInput } from "@/lib/booking-requests";

export const runtime = "nodejs";

const allowedMeetingModes = new Set(["Online call", "Phone call", "In person"]);
const allowedTopics = new Set([
  "Project discussion",
  "Portfolio review",
  "Freelance enquiry",
  "Hiring / internship",
  "Other",
]);

function trimValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const localDigits =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 10
        ? digits
        : "";

  return /^[6-9][0-9]{9}$/.test(localDigits);
}

function validatePreferredDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const selected = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected >= today;
}

function validatePreferredTime(value: string) {
  if (!/^\d{2}:\d{2}$/.test(value)) return false;

  const [hoursText, minutesText] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return false;

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes >= 9 * 60 && totalMinutes <= 19 * 60 + 30;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<BookingRequestInput> | null;

  if (!body) {
    return Response.json({ success: false, message: "Invalid booking payload." }, { status: 400 });
  }

  const bookingInput: BookingRequestInput = {
    name: trimValue(body.name),
    phone: trimValue(body.phone),
    email: trimValue(body.email),
    preferredDate: trimValue(body.preferredDate),
    preferredTime: trimValue(body.preferredTime),
    meetingMode: trimValue(body.meetingMode),
    topic: trimValue(body.topic),
    message: trimValue(body.message),
  };

  if (
    bookingInput.name.length < 2 ||
    bookingInput.name.length > 60 ||
    !validatePhone(bookingInput.phone) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(bookingInput.email) ||
    !validatePreferredDate(bookingInput.preferredDate) ||
    !validatePreferredTime(bookingInput.preferredTime) ||
    !allowedMeetingModes.has(bookingInput.meetingMode) ||
    !allowedTopics.has(bookingInput.topic) ||
    bookingInput.message.length < 20 ||
    bookingInput.message.length > 1000
  ) {
    return Response.json({ success: false, message: "Please check the booking details and try again." }, { status: 400 });
  }

  const booking = await createBookingRequest(bookingInput);

  return Response.json({ success: true, booking }, { status: 201 });
}
