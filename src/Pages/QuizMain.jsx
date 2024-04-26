import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const quizSchema = Yup.object().shape({
    question: Yup.string()
        .required('A question is required'),
    answer1: Yup.string()
        .required('Answer 1 is required'),
    answer2: Yup.string()
        .required('Answer 2 is required'),
    answer3: Yup.string()
        .required('Answer 3 is required'),
    answer4: Yup.string()
        .required('Answer 4 is required'),
    correctAnswer: Yup.number()
        .required('You must select the correct answer')
        .oneOf([1, 2, 3, 4], 'Invalid answer selected')
});

const QuizMain = () => {

    
    const handleSubmit = (values) => {
        
    };

    return (
        <div className="max-w-xl mx-auto mt-10 px-4 py-5 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Add New Quiz</h1>
            <Formik
                initialValues={{
                    question: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    correctAnswer: ''
                }}
                validationSchema={quizSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question:</label>
                            <Field type="text" name="question" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            <ErrorMessage name="question" component="div" className="text-red-500 text-xs italic" />
                        </div>
                        {['answer1', 'answer2', 'answer3', 'answer4'].map((item, index) => (
                            <div key={item}>
                                <label htmlFor={item} className="block text-sm font-medium text-gray-700">Answer {index + 1}:</label>
                                <Field type="text" name={item} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <ErrorMessage name={item} component="div" className="text-red-500 text-xs italic" />
                            </div>
                        ))}
                        <div>
                            <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700">Correct Answer:</label>
                            <Field as="select" name="correctAnswer" className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select the correct answer</option>
                                <option value="1">Answer 1</option>
                                <option value="2">Answer 2</option>
                                <option value="3">Answer 3</option>
                                <option value="4">Answer 4</option>
                            </Field>
                            <ErrorMessage name="correctAnswer" component="div" className="text-red-500 text-xs italic" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Quiz
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default QuizMain;
