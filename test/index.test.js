require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = `${process.env.MONGO_DB_URL}/testing_DB`;
const User = require('../server/model/model');

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


describe('User Model Test', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('get user', () => {

        //Adding user test

        it('gets a user', async () => {
            const user = new User({
                name: 'testName',
                email: 'testEmail',
                gender: 'testGender',
                status: 'testStatus'
            });
            await user.save();

            const foundUser = await User.findOne({ name: 'testName' })
            const expected = 'testName';
            const actual = foundUser.name;
            expect(actual).toEqual(expected);
        });


        //Update Test
        it('update a user', async () => {
            const newMail = 'updatedMail';
            await User.findOneAndUpdate({ name: 'testName' }, {
                email: newMail
            }, { new: true });
            const foundUser = await User.findOne({ name: 'testName' })
            console.log(foundUser);
            const actual = foundUser.email;
            expect(actual).toEqual(newMail);
        });


        // Deletion Test
        it('delete a user', async () => {
            const deletedUserName = 'testName';
            const deletedUser = await User.findOneAndDelete({ name: 'testName' });
            const actual = deletedUser.name;
            expect(actual).toEqual(deletedUserName);
        });
    });
});