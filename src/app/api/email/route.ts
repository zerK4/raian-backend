import { isComplete } from "@/utils";
import { Resend } from "resend";

export async function GET() {
  return Response.json({
    data: "hello nothing",
  });
}

export interface EmailMessageType {
  data: {
    message: string;
    email: string;
    name: string;
    date: string;
    event: string;
    phone: string;
  };
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data }: EmailMessageType = await req.json();

  if (!isComplete(data)) {
    return Response.json(
      {
        message: "Please complete all the fields!",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const successData = await resend.emails.send({
      from: "Say hi <contact@aheader.ink>",
      to: data.email,
      subject: data.name,
      html: data.message,
    });

    return Response.json({
      successData,
      message: `Message successfully sent to <contact@raianvisual.ro>`,
    });
  } catch (err: any) {
    const errorData = await resend.emails.send({
      from: "Error <error@aheader.ink>",
      to: "sebastian.pavel@gmail.com",
      subject: `An error occured sending an email to: ${data.email}`,
      html: `An error occured sending an email to: ${data.email}`,
    });
    return Response.json({
      data: errorData,
      message: `There was an error sending the message to the specified email address: ${err.message}, we have sent an email to <sebastian.v.pavel@gmail.com>`,
    });
  }
}
