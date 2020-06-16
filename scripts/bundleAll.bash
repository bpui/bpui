# 
# 安装所有包的依赖.


libs=()

# dir.
for element in `ls @bpui`
do  
  dir_or_file="@bpui/"$element
  if [ -d $dir_or_file ]
    then 
      dir_or_file=$dir_or_file"/package.json"
      if [ -f $dir_or_file ]; then
        libs=(${libs[@]} "@bpui/"$element)
      fi
  fi  
done

pwd=$PWD;

for lib_name in ${libs[@]}
do
  echo ""
  echo ""
  echo "[bundle npm] "$lib_name
  echo $pwd"/"$lib_name
  cd $pwd"/"$lib_name
  node ../../scripts/bundle.js
done

echo "is done"
