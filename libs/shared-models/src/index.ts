
export class MessagePayload {
  author!: string;
  content!: string;
  timestamp!: string;
  room!: string;
}

export class JoinRoomPayload {
  room!: string;
  user!: string;
}