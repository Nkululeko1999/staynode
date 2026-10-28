import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
    @Prop()
    userId: string;

    @Prop()
    placeId: string;

    @Prop()
    invoiceId: string;

    @Prop()
    timestamp: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;
};

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);
