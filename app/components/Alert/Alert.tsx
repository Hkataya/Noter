import React from 'react';
import { AlertType } from '../../reducers/ui/types';
import AlertStatusTypes from '../../constants/alert-types.json';

type Props = AlertType;

const Alert = (props: Props) => {
  const { status, message, visible } = props;
  let statusColor;

  if (status === AlertStatusTypes.INFO)
    statusColor = 'bg-teal-100 border-teal-500 text-teal-900 ';
  else if (status === AlertStatusTypes.WARNING)
    statusColor = 'bg-yellow-100 border-yellow-500 text-yellow-900 ';
  if (status === AlertStatusTypes.ERROR)
    statusColor = 'bg-red-100 border-red-500 text-red-900 ';

  return (
    <>
      {visible ? (
        <div
          className={`${statusColor} absolute mb-10 ml-10 bottom-0 left-0 border-t-4 rounded-b px-4 py-3 shadow-md`}
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6  mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{status}</p>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
