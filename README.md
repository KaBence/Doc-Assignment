# DOC1 Tabloid Assignment
3 parts:
1. React App
2. Java Backend
3. Postgres database

## Creating docker images

**docker build -f &lt;path to Dockerfile&gt; -t &lt;image-name&gt; &lt;root&gt;**

- `-f` option is optional
- `image name:` has to be lowercase and highly advised to add a tag as well
- `root:` usually just a simple ->    .

<blockquote>
  <details>
    <summary>Examples</summary>
    <p>  docker build -t devops-demo:v404 .</p>
    <p>  docker build -f ./Dockerfile -t devops-demo:v404 .</p>
    <p>  docker build -f ./webapp/Dockerfile -t doc-react:v404 ./webapp</p>
  </details>
</blockquote>


## Docker Compose

Docker compose, if set up correctly builds the images and puts the containers into one cluster? and running them in one environment, letting them communicate.

**docker compose up**

- Creates the containers and setting up the connections between them
- `--build` If there is problem that it is grabbing the previous images rather than building a new image, this way it is possible to force it

**docker compose down**

- Removes the containers completely from Docker Engine

**docker compose build**

- Builds the images that are in the docker compose file but doesn't start them.

## Starting Minikube

**minikube start --driver=docker** <br>
**eval $(minikube docker-env)**

In order for minikube to successfully find the images that needs to be run inside the pods, first the images has to be saved into a .tar file and load them into minikube

**docker compose build**  or   **docker build .....**

- it is advised to create the images so it is up to date

**docker image save -o &lt;name&gt;.tar &lt;image name with the tag&gt;**

- `-o` option is specifying where the tar file should be saved
- It is possible to save multiple images into one tar file !!!! NOT YET TESTED

<blockquote>
  <details>
    <summary>Examples</summary>
    <p>  docker image save -o doc-assignment.tar doc-react:v405</p>
    <p>  docker image save -o doc-assignment.tar doc-react:v405 devops-demo:v405</p>
  </details>
</blockquote>

**minikube image load &gt;tar file&lt;**

- loads the images into the minikube container, letting it use the images.

## Deploying services in minikube

**kompose convert**

- creates all the necessary files which is needed to deploy on kubernetes based on the docker compose file

**kubectl apply -f &lt;all the files that the previous command created&&gt;**

- Starts the pods and services based on the files.

<blockquote>
  <details>
    <summary>Examples</summary>
    <p>kubectl apply -f backend-deployment.yaml,backend-service.yaml,db-persistentvolumeclaim.yaml,db-deployment.yaml,db-service.yaml,web-deployment.yaml,web-service.yaml</p>
  </details>
</blockquote>

## Good to have commands

**kubectl get deployment**

- Gives information about the deployments e.g backend,web deployments

**kubectl get service**

- Gives information about the clusters, their IP, Ports
  
**kubectl get pods**

- Gives informations about the pods which pods are running

**minikube service &lt;name&gt;**

- Gives an external IP to access the pod on the computer
- `name` is the name specified in the docker compose or in the yaml files the name before the `-` e.g backend,web,db

**minikube dashboard**

- Opens a GUI in browser to look at the status of the pods etc...
