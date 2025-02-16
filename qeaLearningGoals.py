import pandas as pd

df = pd.read_csv("topics.csv")
df['classAssociated'] = df['classAssociated'].fillna('')
df['assignmentAssociated'] = df['assignmentAssociated'].fillna('')

days = [
    "L1", "HW1", "L2", "HW2", "L3", "L4", "HW3", "L5", "L6", "HW4", "L7", "L8", "HW5",
    "L9", "L10", "L11", "L12", "HW6", "L13", "HW7", "L14", "L15", "HW8", "L16", "L17",
    "HW9", "L18", "L19", "HW10", "L20"
]

result = []

def replace_lg_with_linalg(topic):
    return topic.replace("LG", "LinAlg")

for day in days:
    oldLGs = []
    newLGs = []

    for index, row in df.iterrows():
        class_associated = str(row['classAssociated'])
        assignment_associated = str(row['assignmentAssociated'])

        # Split the strings and handle cases where they might be empty
        classes = class_associated.split(', ') if class_associated else []
        assignments = assignment_associated.split(', ') if assignment_associated else []

        if day in classes or day in assignments:
            oldLGs.append(row['topicInQuestion'])
            newLGs.append(replace_lg_with_linalg(row['topicInQuestion']))

    result.append({
        "Day/HW": day,
        "Old LG": ", ".join(oldLGs),
        "LG": ", ".join(newLGs)
    })

# for item in result:
#     print(f"Day/HW: {item['Day/HW']}, Old LG: {item['Old LG']}, LG: {item['LG']}")

result_df = pd.DataFrame(result)
result_df.to_csv('output_LGs.csv')
