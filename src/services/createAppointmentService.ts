import {startOfHour, parseISO} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request{
    provider: string;
    date: Date;

}

export default class CreateAppointmentService{

    public async execute({date, provider}: Request): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date); 
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(date);

    if(findAppointmentInSameDate){
        throw Error('This Appointment is Already Booked');
    }

    const appointment = appointmentsRepository.create({
        provider,
        date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
        return appointment;
    }

}