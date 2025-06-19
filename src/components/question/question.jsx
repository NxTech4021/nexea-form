import { FormField, FormItem } from '@/components/ui/form';
import { MatrixAssessment } from '@/components/matrix-assessment';
import PropTypes from 'prop-types';

const Question = ({ data, columns, errors, handleChange, form }) => {
  return (
    <div id={`${data.id}-section`}>
      <FormField
        control={form.control}
        name={data.id}
        render={({ field }) => (
          <FormItem>
            <MatrixAssessment
              columns={columns}
              errors={errors}
              matrixId={data.id}
              onChange={(newValue) => {
                console.log(newValue);
                handleChange(data.id, field.onChange, newValue);
              }}
              question={data.question}
              rows={data.rows || []}
              value={field.value}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Question;

Question.propTypes = {
  columns: PropTypes.array,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  data: PropTypes.object,
  form: PropTypes.object,
};
