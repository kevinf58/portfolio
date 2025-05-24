import { toast } from 'react-toastify';

const copyText = () => {
  const notifySuccess = () => toast.success('Email Copied!');

  navigator.clipboard.writeText('kfeng58@uwo.ca').then(() => {
    notifySuccess();
  });
};

export default copyText;
