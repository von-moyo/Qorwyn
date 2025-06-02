import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';


interface ForgotPasswordPayload {
  email: string;
}
interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordPayload) => void;
  isLoading: boolean;
} 


const loginFormSchema = zod.object({
  email: zod.string().min(1, 'Email is required'),
});

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmitHandler: SubmitHandler<ForgotPasswordPayload> = (data: ForgotPasswordPayload) => {
    onSubmit(data);
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md md:text-sm text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:font-extralight placeholder:text-sm"
            placeholder="Enter your email adddress"
            value={watch('email')}
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <a href='/reset-password'>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5 text-gray-500"/> : 'Reset Password'}
          </button>
        </a>

        <div className="text-center">
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Login?
          </a>
        </div>
      </form>
    </div>
  )
}

export { ForgotPasswordForm };
