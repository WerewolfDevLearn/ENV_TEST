import routes from 'src/routes';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { NavigateLink } from './AuthNavigate.styled';

export default function AuthNavigate({ formType }) {
  const { t } = useTranslation();
  const filanRout = formType === 'register' ? routes.loginPage : routes.registerPage;
  const filanContent = formType === 'register' ? t('Log In') : t('Sign up');

  return (
    <div>
      <NavigateLink to={filanRout}>{filanContent}</NavigateLink>
    </div>
  );
}

AuthNavigate.propTypes = {
  formType: PropTypes.string.isRequired
};
