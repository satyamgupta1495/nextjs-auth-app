import mongoose from 'mongoose';

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Database connected successfully🚀!')
        })

        connection.on('error', (error) => {
            console.log('Error occured 💀!' + error)
            process.exit()
        })

    } catch (error) {
        console.log('Error occured 💀!')
    }
}