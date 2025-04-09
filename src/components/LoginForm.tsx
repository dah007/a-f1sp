import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import ButtonStyled from './ButtonStyled';
import { F1SP_BASE_DB_URL } from 'constants/constants';

const formSchema = z
    .object({
        name: z.string().min(2).max(50),
        pin: z.string().min(2).max(6),
    })
    .required();

export type FormData = z.infer<typeof formSchema>;

const LoginForm = (): JSX.Element => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            pin: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        const response = await fetch(`${F1SP_BASE_DB_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ name: values.name, pin: values.pin }),
        }).then((res) => res.json());

        console.log(response);

        // const response = await useLoginQuery({ name: values.name, pin: values.pin });
        if (response.error) {
            console.error('Login failed:', response.error);
        } else {
            console.log('Login successful:', response.data);
        }
    };

    // return <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields go here */}</form>;
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <p className="w-96 mb-2">
                If you have an account use this form to login, if you don&rsquo;t, one will be created from this info.
            </p>
            <div className="flex flex-col items-center justify-center border border-gray-200 rounded-md p-8 w-96">
                <h1 className="mt-0 mb-2 text-2xl font-bold">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-700 italic" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PIN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter PIN" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is a{' '}
                                        <em>
                                            <strong>NOT</strong>
                                        </em>{' '}
                                        secure access PIN.
                                    </FormDescription>
                                    <FormMessage className="text-red-700 italic" />
                                </FormItem>
                            )}
                        />

                        <ButtonStyled type="submit">Submit</ButtonStyled>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
